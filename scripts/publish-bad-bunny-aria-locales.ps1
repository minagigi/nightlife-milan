param(
  [ValidateRange(1, 30)]
  [int]$MaxAttempts = 20,
  [ValidateRange(1, 3)]
  [int]$WaveSize = 2,
  [ValidateRange(1, 5)]
  [int]$VariantBatchSize = 2,
  [string[]]$ForceRefreshLocales = @(),
  [string[]]$Locales = @(
    'en','it','es','fr','de','pt','nl','ru','tr','zh','ar','bg','hr','cs','da','et','fi','el','hu','ga',
    'lv','lt','mt','pl','ro','sk','sl','sv','no','is','uk','sq','sr','bs','mk'
  )
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$root = Split-Path -Parent $PSScriptRoot
$endpoint = 'https://nightlifemilan.com/api/events/publish-bad-bunny-aria'
$artifactDirectory = Join-Path $root 'artifacts/bad-bunny-aria-2026-07-18'
$resultPath = Join-Path $artifactDirectory 'eventbrite-all-locales-results.json'
$secretBytes = New-Object byte[] 48
$random = [Security.Cryptography.RandomNumberGenerator]::Create()
$random.GetBytes($secretBytes)
$random.Dispose()
$secret = [Convert]::ToBase64String($secretBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_')
$envAdded = $false
$responses = [Collections.Generic.List[object]]::new()
$auditEvidence = $null
$completedLocales = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$pendingRefreshLocales = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)

function Convert-Utf8JsonResponse {
  param([Parameter(Mandatory)]$Response)
  $Response.RawContentStream.Position = 0
  $json = [Text.Encoding]::UTF8.GetString($Response.RawContentStream.ToArray())
  return ($json | ConvertFrom-Json)
}

function Get-HttpErrorMessage {
  param([Parameter(Mandatory)]$ErrorRecord)
  $message = [string]$ErrorRecord.Exception.Message
  try {
    $stream = $ErrorRecord.Exception.Response.GetResponseStream()
    if ($null -ne $stream) {
      $reader = New-Object IO.StreamReader($stream, [Text.Encoding]::UTF8, $true)
      $body = $reader.ReadToEnd()
      $reader.Dispose()
      if ($body) { return "$message $body" }
    }
  } catch {}
  return $message
}

function Invoke-ProductionDeploy {
  for ($attempt = 1; $attempt -le 3; $attempt += 1) {
    & npx.cmd vercel --prod --yes
    if ($LASTEXITCODE -eq 0) { return }
    if ($attempt -lt 3) { Start-Sleep -Seconds (15 * $attempt) }
  }
  throw 'Production deploy failed'
}

function Remove-EphemeralSecret {
  for ($attempt = 1; $attempt -le 3; $attempt += 1) {
    & npx.cmd vercel env remove BAD_BUNNY_PUBLISH_SECRET production --yes
    if ($LASTEXITCODE -eq 0) { return }
    if ($attempt -lt 3) { Start-Sleep -Seconds (10 * $attempt) }
  }
  throw 'Ephemeral Bad Bunny rollout secret could not be removed after three attempts'
}

function Assert-SecretRevoked {
  param([Parameter(Mandatory)][string]$RevokedSecret)
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri "$endpoint`?locale=it" -Method Get -Headers @{ Authorization = "Bearer $RevokedSecret" } -TimeoutSec 120
    throw "Revoked secret unexpectedly returned HTTP $([int]$response.StatusCode)"
  } catch {
    $status = 0
    try { $status = [int]$_.Exception.Response.StatusCode } catch { $status = 0 }
    if ($status -ne 401) { throw }
  }
}

function Save-Progress {
  param([string]$State)
  New-Item -ItemType Directory -Force -Path $artifactDirectory | Out-Null
  [pscustomobject][ordered]@{
    state = $State
    updatedAt = (Get-Date).ToString('o')
    locales = @($responses | ForEach-Object { $_.locale })
    forceRefreshPending = @($pendingRefreshLocales)
    responses = $responses.ToArray()
    audit = $auditEvidence
  } | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $resultPath -Encoding UTF8
}

$publishJob = {
  param($Endpoint, $Secret, $Locale, $Attempts, $RefreshExisting, $BatchSize)
  $ErrorActionPreference = 'Stop'
  function Convert-Utf8JsonResponse {
    param([Parameter(Mandatory)]$Response)
    $Response.RawContentStream.Position = 0
    $json = [Text.Encoding]::UTF8.GetString($Response.RawContentStream.ToArray())
    return ($json | ConvertFrom-Json)
  }
  function Get-HttpErrorMessage {
    param([Parameter(Mandatory)]$ErrorRecord)
    $message = [string]$ErrorRecord.Exception.Message
    try {
      $stream = $ErrorRecord.Exception.Response.GetResponseStream()
      if ($null -ne $stream) {
        $reader = New-Object IO.StreamReader($stream, [Text.Encoding]::UTF8, $true)
        $body = $reader.ReadToEnd()
        $reader.Dispose()
        if ($body) { return "$message $body" }
      }
    } catch {}
    return $message
  }
  $combinedResults = [Collections.Generic.List[object]]::new()
  $firstResponse = $null
  for ($fromVariant = 1; $fromVariant -le 10; $fromVariant += $BatchSize) {
    $take = [Math]::Min($BatchSize, 11 - $fromVariant)
    $body = @{ locale = $Locale; fromVariant = $fromVariant; max = $take; refreshExisting = $RefreshExisting } | ConvertTo-Json -Compress
    $chunkResponse = $null
    for ($attempt = 1; $attempt -le $Attempts; $attempt += 1) {
      try {
        $webResponse = Invoke-WebRequest -UseBasicParsing -Uri $Endpoint -Method Post -Headers @{ Authorization = "Bearer $Secret" } -ContentType 'application/json' -Body $body -TimeoutSec 330
        $chunkResponse = Convert-Utf8JsonResponse -Response $webResponse
        if (-not $chunkResponse.ok -or $chunkResponse.count -ne $take) { throw [Exception]::new("Locale $Locale chunk $fromVariant returned $($chunkResponse.count)/$take") }
        break
      } catch {
        if ($attempt -ge $Attempts) { throw }
        $message = Get-HttpErrorMessage -ErrorRecord $_
        $rateLimited = $message -match '429|rate limit|HIT_RATE_LIMIT'
        $delay = if ($rateLimited) { [Math]::Min(300, 60 + ($attempt * 20)) } else { [Math]::Min(90, 10 + ($attempt * 8)) }
        Start-Sleep -Seconds $delay
      }
    }
    if ($null -eq $firstResponse) { $firstResponse = $chunkResponse }
    foreach ($result in @($chunkResponse.results)) { $combinedResults.Add($result) }
  }
  $combined = [pscustomobject][ordered]@{
    ok = $true
    locale = $Locale
    count = $combinedResults.Count
    venueId = $firstResponse.venueId
    refreshedExisting = $RefreshExisting
    affiliateUrl = $firstResponse.affiliateUrl
    results = $combinedResults.ToArray()
  }
  return ($combined | ConvertTo-Json -Depth 8 -Compress)
}

function Invoke-AuditChunk {
  param([int]$Offset, [int]$Limit = 20)
  for ($attempt = 1; $attempt -le $MaxAttempts; $attempt += 1) {
    try {
      $webResponse = Invoke-WebRequest -UseBasicParsing -Uri "$endpoint`?audit=1&offset=$Offset&limit=$Limit" -Method Get -Headers @{ Authorization = "Bearer $secret" } -TimeoutSec 330
      $response = Convert-Utf8JsonResponse -Response $webResponse
      if (-not $response.ok) { throw [Exception]::new([string]$response.error) }
      return $response
    } catch {
      if ($attempt -ge $MaxAttempts) { throw }
      $message = Get-HttpErrorMessage -ErrorRecord $_
      $delay = if ($message -match '429|rate limit|HIT_RATE_LIMIT') { [Math]::Min(300, 60 + ($attempt * 20)) } else { [Math]::Min(90, 10 + ($attempt * 8)) }
      Start-Sleep -Seconds $delay
    }
  }
}

try {
  foreach ($forcedLocale in $ForceRefreshLocales) {
    if ($Locales -notcontains $forcedLocale) { throw "Forced refresh locale $forcedLocale is outside the rollout locale set" }
    [void]$pendingRefreshLocales.Add($forcedLocale)
  }
  if (Test-Path -LiteralPath $resultPath) {
    $checkpoint = Get-Content -LiteralPath $resultPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $pendingProperty = $checkpoint.PSObject.Properties['forceRefreshPending']
    if ($null -ne $pendingProperty) {
      foreach ($pendingLocale in @($pendingProperty.Value)) {
        if ($Locales -contains [string]$pendingLocale) { [void]$pendingRefreshLocales.Add([string]$pendingLocale) }
      }
    }
    $seededIds = [Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
    foreach ($response in @($checkpoint.responses)) {
      $locale = [string]$response.locale
      if ($Locales -notcontains $locale) { continue }
      if ($pendingRefreshLocales.Contains($locale)) { continue }
      $results = @($response.results)
      $markers = @($results | Select-Object -ExpandProperty marker)
      $ids = @($results | Select-Object -ExpandProperty id | ForEach-Object { [string]$_ })
      $expectedLocaleMarkers = @(1..10 | ForEach-Object { "nlm:curated=bad-bunny-aria-v$_-$locale-2026-07-18" })
      $markerDifference = @(Compare-Object -ReferenceObject $expectedLocaleMarkers -DifferenceObject $markers)
      if (-not $response.ok -or $response.count -ne 10 -or $results.Count -ne 10 -or @($markers | Select-Object -Unique).Count -ne 10 -or $markerDifference.Count -ne 0) { throw "Invalid checkpoint payload for locale $locale" }
      if (@($ids | Where-Object { $_ -notmatch '^\d+$' }).Count -ne 0 -or @($ids | Select-Object -Unique).Count -ne 10) { throw "Invalid checkpoint IDs for locale $locale" }
      if (@($results | Where-Object { $_.title -notmatch 'Bad Bunny' }).Count -ne 0) { throw "Invalid checkpoint titles for locale $locale" }
      foreach ($id in $ids) { if (-not $seededIds.Add($id)) { throw "Checkpoint reuses Eventbrite ID $id" } }
      if ($completedLocales.Add($locale)) { $responses.Add($response) }
    }
  }
  if ($pendingRefreshLocales.Count -gt 0) { Save-Progress -State 'forced-refresh-pending' }

  $secret | & npx.cmd vercel env add BAD_BUNNY_PUBLISH_SECRET production
  if ($LASTEXITCODE -ne 0) { throw 'Unable to add the ephemeral Bad Bunny rollout secret' }
  $envAdded = $true
  Invoke-ProductionDeploy

  foreach ($locale in $Locales) {
    $probeResponse = Invoke-WebRequest -UseBasicParsing -Uri "$endpoint`?locale=$locale" -Method Get -Headers @{ Authorization = "Bearer $secret" } -TimeoutSec 120
    $probe = Convert-Utf8JsonResponse -Response $probeResponse
    if (-not $probe.ready -or $probe.variants.Count -ne 10 -or @($probe.variants | Where-Object { $_.title -notmatch 'Bad Bunny' }).Count -ne 0) {
      throw "Protected publisher plan failed for $locale"
    }
  }

  if ($Locales -contains 'it' -and -not $completedLocales.Contains('it')) {
    $italianJson = & $publishJob $endpoint $secret 'it' $MaxAttempts $true $VariantBatchSize
    $italian = $italianJson | ConvertFrom-Json
    if ($italian.count -ne 10) { throw "Italian refresh returned $($italian.count)/10" }
    $responses.Add($italian)
    [void]$completedLocales.Add('it')
    [void]$pendingRefreshLocales.Remove('it')
    Save-Progress -State 'italian-refreshed'
  }

  $remaining = @($Locales | Where-Object { -not $completedLocales.Contains($_) })
  for ($offset = 0; $offset -lt $remaining.Count; $offset += $WaveSize) {
    $wave = @($remaining[$offset..([Math]::Min($remaining.Count - 1, $offset + $WaveSize - 1))])
    # Refresh marker-matched listings as well as creating missing ones. This keeps a
    # resumed rollout corrective and idempotent after any content-generator fix.
    $jobs = @($wave | ForEach-Object { Start-Job -ScriptBlock $publishJob -ArgumentList $endpoint, $secret, $_, $MaxAttempts, $true, $VariantBatchSize })
    Wait-Job -Job $jobs | Out-Null
    foreach ($job in $jobs) {
      if ($job.State -ne 'Completed') {
        $reason = [string]$job.ChildJobs[0].JobStateInfo.Reason
        Remove-Job -Job $jobs -Force -ErrorAction SilentlyContinue
        throw "Locale rollout job failed: $reason"
      }
      $json = Receive-Job -Job $job
      $response = $json | ConvertFrom-Json
      if (-not $response.ok -or $response.count -ne 10) { throw "Locale $($response.locale) returned $($response.count)/10" }
      $responses.Add($response)
      [void]$completedLocales.Add([string]$response.locale)
      [void]$pendingRefreshLocales.Remove([string]$response.locale)
      Write-Output ("LOCALE_COMPLETE locale={0} listings={1}" -f $response.locale, $response.count)
    }
    Remove-Job -Job $jobs -Force
    Save-Progress -State ("wave-{0}" -f ($offset + $wave.Count))
  }

  $events = @($responses | ForEach-Object { @($_.results) })
  $localeCount = @($responses | Select-Object -ExpandProperty locale -Unique).Count
  $uniqueIds = @($events | Select-Object -ExpandProperty id -Unique).Count
  $uniqueMarkers = @($events | Select-Object -ExpandProperty marker -Unique).Count
  if ($localeCount -ne $Locales.Count -or $events.Count -ne ($Locales.Count * 10) -or $uniqueIds -ne $events.Count -or $uniqueMarkers -ne $events.Count) {
    throw "Final inventory failed: locales=$localeCount events=$($events.Count) uniqueIds=$uniqueIds uniqueMarkers=$uniqueMarkers"
  }
  if (@($events | Where-Object { $_.title -notmatch 'Bad Bunny' }).Count -ne 0) { throw 'At least one live title does not contain Bad Bunny' }

  $candidateRows = [Collections.Generic.List[object]]::new()
  $markerRows = [Collections.Generic.List[object]]::new()
  $offset = 0
  $candidateTotal = -1
  for ($chunkNumber = 1; $chunkNumber -le 100; $chunkNumber += 1) {
    $audit = Invoke-AuditChunk -Offset $offset
    if ($audit.expectedMarkerCount -ne 350) { throw "Audit expected-marker manifest is $($audit.expectedMarkerCount), not 350" }
    if ($candidateTotal -lt 0) { $candidateTotal = [int]$audit.candidateTotal }
    elseif ([int]$audit.candidateTotal -ne $candidateTotal) { throw 'Audit candidate inventory changed between chunks' }
    $rows = @($audit.rows)
    for ($index = 0; $index -lt $rows.Count; $index += 1) {
      $row = $rows[$index]
      if ([int]$row.candidateIndex -ne ($offset + $index)) { throw "Audit candidate index gap at $offset" }
      $candidateRows.Add($row)
      foreach ($markerRow in @($row.markerRows)) { $markerRows.Add($markerRow) }
    }
    if ($null -eq $audit.chunk.nextOffset) { break }
    $offset = [int]$audit.chunk.nextOffset
  }
  if ($candidateRows.Count -ne $candidateTotal) { throw "Audit returned $($candidateRows.Count)/$candidateTotal candidates" }
  $expectedMarkers = @($events | Select-Object -ExpandProperty marker)
  $expectedLookup = @{}
  foreach ($marker in $expectedMarkers) { $expectedLookup[[string]$marker] = $true }
  $observedExpected = @($markerRows | Where-Object { $expectedLookup.ContainsKey([string]$_.marker) })
  $unexpected = @($markerRows | Where-Object { -not $expectedLookup.ContainsKey([string]$_.marker) })
  $duplicates = @($observedExpected | Group-Object marker | Where-Object { $_.Count -ne 1 })
  $multiMarkerEvents = @($candidateRows | Where-Object { @($_.markerRows).Count -gt 1 })
  $badRows = @($observedExpected | Where-Object { -not $_.expected -or -not $_.titleExact -or @('live','started') -notcontains [string]$_.status })
  $eventIdByMarker = @{}
  foreach ($event in $events) { $eventIdByMarker[[string]$event.marker] = [string]$event.id }
  $idMismatches = @($observedExpected | Where-Object { $eventIdByMarker[[string]$_.marker] -ne [string]$_.eventId })
  $auditUniqueIds = @($observedExpected | Select-Object -ExpandProperty eventId -Unique).Count
  if ($observedExpected.Count -ne 350 -or $duplicates.Count -ne 0 -or $unexpected.Count -ne 0 -or $multiMarkerEvents.Count -ne 0 -or $badRows.Count -ne 0 -or $idMismatches.Count -ne 0 -or $auditUniqueIds -ne 350) {
    throw "Independent audit failed: observed=$($observedExpected.Count) duplicates=$($duplicates.Count) unexpected=$($unexpected.Count) multiMarker=$($multiMarkerEvents.Count) badRows=$($badRows.Count) idMismatches=$($idMismatches.Count) uniqueIds=$auditUniqueIds"
  }
  $auditEvidence = [pscustomobject][ordered]@{
    candidateTotal = $candidateTotal
    expectedMarkers = 350
    observedExactMarkers = $observedExpected.Count
    uniqueLiveOrStartedIds = $auditUniqueIds
    duplicateMarkers = 0
    unexpectedMarkers = 0
  }

  $pilotLocale = if ($Locales -contains 'en') { 'en' } else { $Locales[0] }
  $pilotBefore = @($events | Where-Object { $_.marker -eq "nlm:curated=bad-bunny-aria-v1-$pilotLocale-2026-07-18" })[0]
  $pilotBody = @{ locale = $pilotLocale; fromVariant = 1; max = 1; refreshExisting = $false } | ConvertTo-Json -Compress
  $pilotResponse = Invoke-WebRequest -UseBasicParsing -Uri $endpoint -Method Post -Headers @{ Authorization = "Bearer $secret" } -ContentType 'application/json' -Body $pilotBody -TimeoutSec 330
  $pilotAfter = Convert-Utf8JsonResponse -Response $pilotResponse
  if (-not $pilotAfter.ok -or $pilotAfter.results[0].id -ne $pilotBefore.id) { throw 'Final marker idempotency readback failed' }

  Save-Progress -State 'verified'
  [pscustomobject][ordered]@{
    ok = $true
    locales = $localeCount
    publishedAndVerified = $events.Count
    uniqueLiveIds = $uniqueIds
    uniqueMarkers = $uniqueMarkers
    idempotentPilot = $pilotBefore.id
    resultPath = $resultPath
  } | ConvertTo-Json -Compress
} finally {
  Get-Job -ErrorAction SilentlyContinue | Remove-Job -Force -ErrorAction SilentlyContinue
  if ($envAdded) {
    Remove-EphemeralSecret
    Invoke-ProductionDeploy
    Assert-SecretRevoked -RevokedSecret $secret
  }
  $secret = $null
  [Array]::Clear($secretBytes, 0, $secretBytes.Length)
}
