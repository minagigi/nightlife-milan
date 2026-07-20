param(
  [ValidateRange(1, 6)]
  [int]$MaxAttempts = 4,
  [string]$LocaleCsv = '',
  [string]$CheckpointPath = '',
  [ValidateRange(0, 120)]
  [int]$WaitForRateLimitMinutes = 90
)

$ErrorActionPreference = 'Stop'
$endpoint = 'https://nightlifemilan.com/api/events/refresh-world-cup-visuals'
$probeEndpoint = 'https://nightlifemilan.com/api/events/publish-world-cup-locales?rateProbe=1'
$visualRevision = 'wc26-fullbleed-v3'
$secretBytes = New-Object byte[] 48
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($secretBytes)
$secret = [Convert]::ToBase64String($secretBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_')
$envAdded = $false

function Invoke-ProductionDeploy {
  for ($attempt = 1; $attempt -le 3; $attempt += 1) {
    & npx.cmd vercel --prod --yes
    if ($LASTEXITCODE -eq 0) { return }
    if ($attempt -lt 3) { Start-Sleep -Seconds (15 * $attempt) }
  }
  throw 'Production deploy failed'
}

function Invoke-VisualApi {
  param(
    [ValidateSet('GET', 'POST')]
    [string]$Method,
    [string]$Secret,
    [hashtable]$Body
  )
  for ($attempt = 1; $attempt -le $MaxAttempts; $attempt += 1) {
    try {
      $params = @{
        Uri = $endpoint
        Method = $Method
        Headers = @{ Authorization = "Bearer $Secret" }
        TimeoutSec = 330
      }
      if ($Method -eq 'POST') {
        $params.ContentType = 'application/json'
        $params.Body = $Body | ConvertTo-Json -Compress
      }
      $response = Invoke-RestMethod @params
      if (-not $response.ok) { throw $response.error }
      return $response
    } catch {
      if ($attempt -ge $MaxAttempts) { throw }
      Write-Output ("API_RETRY method={0} locale={1} attempt={2} error={3}" -f $Method, $Body.locale, $attempt, $_.Exception.Message)
      Start-Sleep -Seconds (@(15, 30, 60, 90)[[Math]::Min($attempt - 1, 3)])
    }
  }
}

function Wait-ForEventbriteRateLimit {
  param([string]$Secret, [int]$Minutes)
  if ($Minutes -le 0) { return }
  $deadline = [DateTimeOffset]::UtcNow.AddMinutes($Minutes)
  while ($true) {
    $probe = Invoke-RestMethod -Uri $probeEndpoint -Method Get -Headers @{ Authorization = "Bearer $Secret" } -TimeoutSec 30
    if ($probe.eventbriteStatus -eq 200) {
      Write-Output 'EVENTBRITE_RATE_LIMIT_READY'
      return
    }
    if ($probe.eventbriteStatus -ne 429) {
      throw "Unexpected Eventbrite rate probe status: $($probe.eventbriteStatus)"
    }
    if ([DateTimeOffset]::UtcNow -ge $deadline) {
      throw "Eventbrite rate limit did not reset within $Minutes minutes"
    }
    Write-Output ("EVENTBRITE_RATE_LIMIT_WAIT utc={0} retryAfter={1} reset={2}" -f
      [DateTimeOffset]::UtcNow.ToString('o'), $probe.retryAfter, $probe.rateLimitReset)
    Start-Sleep -Seconds 55
  }
}

try {
  $secret | & npx.cmd vercel env add WORLD_CUP_ROLLOUT_SECRET production
  if ($LASTEXITCODE -ne 0) { throw 'Unable to add ephemeral rollout secret' }
  $envAdded = $true
  Invoke-ProductionDeploy
  Wait-ForEventbriteRateLimit -Secret $secret -Minutes $WaitForRateLimitMinutes

  $before = Invoke-VisualApi -Method GET -Secret $secret -Body @{}
  if ($before.inventory.localeCount -ne 35 -or $before.inventory.expectedLocaleCount -ne 35 -or
    $before.inventory.uniqueMarkerCount -ne 175 -or $before.inventory.expectedUniqueMarkerCount -ne 175 -or
    $before.inventory.total -lt 175 -or @($before.inventory.missingLocales).Count -ne 0 -or
    @($before.inventory.incompleteMarkerLocales).Count -ne 0) {
    throw ("Incomplete live World Cup inventory: locales={0}/35 markers={1}/175 listings={2} missing={3} incomplete={4}" -f
      $before.inventory.localeCount, $before.inventory.uniqueMarkerCount, $before.inventory.total,
      (@($before.inventory.missingLocales) -join ','), (@($before.inventory.incompleteMarkerLocales) -join ','))
  }

  $requestedLocales = @($LocaleCsv.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ })
  $runLocales = if ($requestedLocales.Count -gt 0) { $requestedLocales } else { @($before.inventory.locales) }
  foreach ($requestedLocale in $runLocales) {
    if (-not @($before.inventory.locales).Contains($requestedLocale)) {
      throw "Requested locale is not present in the verified inventory: $requestedLocale"
    }
  }

  $checkpointEntries = @()
  if ($runLocales.Count -lt @($before.inventory.locales).Count) {
    if (-not $CheckpointPath -or -not (Test-Path -LiteralPath $CheckpointPath)) {
      throw 'A partial resume requires a verified checkpoint file'
    }
    $checkpoint = Get-Content -Raw -LiteralPath $CheckpointPath | ConvertFrom-Json
    if ($checkpoint.visualRevision -ne $visualRevision -or [int]$checkpoint.liveListings -ne [int]$before.inventory.total) {
      throw 'Checkpoint revision or live-listing count does not match the verified inventory'
    }
    $checkpointEntries = @($checkpoint.completedLocales)
    foreach ($entry in $checkpointEntries) {
      $state = $before.inventory.byLocale.PSObject.Properties[[string]$entry.locale].Value
      if (-not $state -or [int]$entry.listings -ne [int]$state.listings) {
        throw "Checkpoint listing count does not match inventory for $($entry.locale)"
      }
    }
    $coveredLocales = @($checkpointEntries | ForEach-Object { [string]$_.locale }) + $runLocales | Select-Object -Unique
    $missingCoverage = @($before.inventory.locales | Where-Object { -not $coveredLocales.Contains($_) })
    if ($missingCoverage.Count -ne 0) {
      throw "Resume checkpoint plus selected locales do not cover: $($missingCoverage -join ',')"
    }
  }

  $results = @()
  $resumeResults = @()
  foreach ($entry in $checkpointEntries) {
    $locale = [string]$entry.locale
    $localeState = $before.inventory.byLocale.PSObject.Properties[$locale].Value
    $audited = Invoke-VisualApi -Method POST -Secret $secret -Body @{
      locale = $locale
      apply = $true
      resumeAudit = $true
      targets = @($localeState.targets)
    }
    if (-not $audited.resumeAudit -or $audited.processed -ne [int]$entry.listings -or $audited.uploadedMedia -ne 1) {
      throw "Resume cover/confirmation audit failed for $locale"
    }
    $resumeResults += @($audited.results)
    Write-Output ("RESUME_DONE locale={0} processed={1} media={2}" -f $locale, $audited.processed, $audited.uploadedMedia)
  }

  foreach ($locale in $runLocales) {
    $localeState = $before.inventory.byLocale.PSObject.Properties[$locale].Value
    if ($localeState.uniqueMarkers -ne 5 -or $localeState.listings -lt 5) {
      throw ("Incomplete locale inventory: locale={0} markers={1}/5 listings={2}" -f $locale, $localeState.uniqueMarkers, $localeState.listings)
    }
    $targetPairs = @($localeState.targets)
    $dryRun = Invoke-VisualApi -Method POST -Secret $secret -Body @{ locale = $locale; apply = $false; targets = $targetPairs }
    if (-not $dryRun.dryRun -or $dryRun.listings -lt 1) {
      throw "Dry-run failed for $locale"
    }
    $applied = Invoke-VisualApi -Method POST -Secret $secret -Body @{ locale = $locale; apply = $true; targets = $targetPairs }
    if ($applied.processed -ne $dryRun.listings -or $applied.uploadedMedia -ne 6) {
      throw "Applied verification count failed for $locale"
    }
    $results += @($applied.results)
    Write-Output ("LOCALE_DONE locale={0} processed={1} media={2}" -f $locale, $applied.processed, $applied.uploadedMedia)
  }

  $after = Invoke-VisualApi -Method GET -Secret $secret -Body @{}
  if (($after.inventory.total -ne $before.inventory.total) -or
    ($after.inventory.localeCount -ne 35) -or
    ($after.inventory.uniqueMarkerCount -ne 175) -or
    (@($after.inventory.missingLocales).Count -ne 0) -or
    (@($after.inventory.incompleteMarkerLocales).Count -ne 0) -or
    ($after.inventory.visualsComplete -ne $after.inventory.total)) {
    throw ("Final visual inventory failed: before={0} after={1} complete={2} processed={3}" -f $before.inventory.total, $after.inventory.total, $after.inventory.visualsComplete, $results.Count)
  }
  $checkpointVerified = $resumeResults.Count
  if (($checkpointVerified + $results.Count) -ne $after.inventory.total) {
    throw ("Cross-run readback coverage failed: checkpoint={0} current={1} total={2}" -f $checkpointVerified, $results.Count, $after.inventory.total)
  }

  [pscustomobject]@{
    ok = $true
    apiOnly = $true
    liveListings = $after.inventory.total
    localeCount = $after.inventory.localeCount
    uniqueMarkerCount = $after.inventory.uniqueMarkerCount
    duplicateListingCount = $after.inventory.duplicateListingCount
    visualsComplete = $after.inventory.visualsComplete
    updatedAndVerifiedThisRun = $results.Count
    verifiedFromCheckpoint = $checkpointVerified
    verifiedAcrossRuns = $checkpointVerified + $results.Count
    selectedLocaleCount = $runLocales.Count
    uploadedMediaThisRun = $checkpointEntries.Count + ($runLocales.Count * 6)
    eventIds = @($resumeResults + $results | ForEach-Object { $_.eventId })
  } | ConvertTo-Json -Depth 6 -Compress
} finally {
  $secret = $null
  [Array]::Clear($secretBytes, 0, $secretBytes.Length)
  if ($envAdded) {
    & npx.cmd vercel env remove WORLD_CUP_ROLLOUT_SECRET production --yes
    if ($LASTEXITCODE -ne 0) {
      Write-Error 'Ephemeral rollout secret could not be removed.'
    } else {
      Invoke-ProductionDeploy
    }
  }
}
