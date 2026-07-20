param(
  [ValidateRange(1, 15)]
  [int]$BatchSize = 10,
  [ValidateRange(1, 6)]
  [int]$MaxAttempts = 4,
  [switch]$RegisteredItalianOnly
)

$ErrorActionPreference = 'Stop'
$endpoint = 'https://nightlifemilan.com/api/events/refresh-world-cup-affiliate'
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

function Invoke-RefreshBatch {
  param([int]$Offset, [string]$Secret)
  $body = @{
    offset = $Offset
    max = $BatchSize
    registeredItalianOnly = [bool]$RegisteredItalianOnly
  } | ConvertTo-Json -Compress
  for ($attempt = 1; $attempt -le $MaxAttempts; $attempt += 1) {
    try {
      $response = Invoke-RestMethod -Uri $endpoint -Method Post -Headers @{ Authorization = "Bearer $Secret" } -ContentType 'application/json' -Body $body -TimeoutSec 330
      if (-not $response.ok) { throw $response.error }
      return $response
    } catch {
      if ($attempt -ge $MaxAttempts) { throw }
      Write-Output ("BATCH_RETRY offset={0} attempt={1} error={2}" -f $Offset, $attempt, $_.Exception.Message)
      Start-Sleep -Seconds (@(15, 30, 60, 90)[[Math]::Min($attempt - 1, 3)])
    }
  }
}

try {
  $secret | & npx.cmd vercel env add WORLD_CUP_ROLLOUT_SECRET production
  if ($LASTEXITCODE -ne 0) { throw 'Unable to add ephemeral rollout secret' }
  $envAdded = $true
  Invoke-ProductionDeploy

  $offset = 0
  $results = @()
  do {
    $response = Invoke-RefreshBatch -Offset $offset -Secret $secret
    $results += @($response.results)
    Write-Output ("BATCH_DONE offset={0} processed={1} total={2}" -f $offset, $response.processed, $response.inventoryBeforeBatch.total)
    $offset = [int]$response.nextOffset
  } while (-not $response.complete)

  if ($RegisteredItalianOnly) {
    if ($results.Count -ne 5 -or @($results | Where-Object { -not $_.confirmationsVerified }).Count -ne 0) {
      throw "Registered Italian verification failed: verified=$($results.Count)"
    }
    [pscustomobject]@{
      ok = $true
      scope = 'registered-italian'
      updatedAndVerified = $results.Count
      descriptionsChanged = @($results | Where-Object { $_.descriptionChanged }).Count
      confirmationsVerified = @($results | Where-Object { $_.confirmationsVerified }).Count
      eventIds = @($results | ForEach-Object { $_.eventId })
    } | ConvertTo-Json -Depth 5 -Compress
  } else {
    $audit = Invoke-RestMethod -Uri $endpoint -Method Get -Headers @{ Authorization = "Bearer $secret" } -TimeoutSec 120
    if (-not $audit.ok) { throw $audit.error }
    if ($audit.inventory.oldUrlCount -ne 0 -or $audit.inventory.newUrlCount -ne $audit.inventory.total) {
      throw "Final inventory failed: old=$($audit.inventory.oldUrlCount) new=$($audit.inventory.newUrlCount) total=$($audit.inventory.total)"
    }

    [pscustomobject]@{
      ok = $true
      scope = 'marker-matched-live'
      updatedAndVerified = $results.Count
      descriptionsChanged = @($results | Where-Object { $_.descriptionChanged }).Count
      localeCount = $audit.inventory.localeCount
      liveListings = $audit.inventory.total
      uniqueMarkerCount = $audit.inventory.uniqueMarkerCount
      duplicateListingCount = $audit.inventory.duplicateListingCount
      oldUrlCount = $audit.inventory.oldUrlCount
      newUrlCount = $audit.inventory.newUrlCount
      eventIds = @($results | ForEach-Object { $_.eventId })
    } | ConvertTo-Json -Depth 5 -Compress
  }
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
