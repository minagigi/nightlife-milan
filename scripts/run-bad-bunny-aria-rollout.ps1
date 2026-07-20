param(
  [ValidateRange(1, 5)]
  [int]$MaxAttempts = 3
)

$ErrorActionPreference = 'Stop'
$endpoint = 'https://nightlifemilan.com/api/events/publish-bad-bunny-aria'
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

function Invoke-PublishBatch {
  param([int]$FromVariant, [int]$Count, [string]$Secret)
  $body = @{ fromVariant = $FromVariant; max = $Count } | ConvertTo-Json -Compress
  for ($attempt = 1; $attempt -le $MaxAttempts; $attempt += 1) {
    try {
      $response = Invoke-RestMethod -Uri $endpoint -Method Post -Headers @{ Authorization = "Bearer $Secret" } -ContentType 'application/json' -Body $body -TimeoutSec 330
      if (-not $response.ok) { throw $response.error }
      return $response
    } catch {
      if ($attempt -ge $MaxAttempts) { throw }
      Write-Output ("BATCH_RETRY from={0} count={1} attempt={2} error={3}" -f $FromVariant, $Count, $attempt, $_.Exception.Message)
      Start-Sleep -Seconds (@(15, 30, 60, 90)[[Math]::Min($attempt - 1, 3)])
    }
  }
}

try {
  $secret | & npx.cmd vercel env add BAD_BUNNY_PUBLISH_SECRET production
  if ($LASTEXITCODE -ne 0) { throw 'Unable to add ephemeral Bad Bunny rollout secret' }
  $envAdded = $true
  Invoke-ProductionDeploy

  $probe = Invoke-RestMethod -Uri $endpoint -Method Get -Headers @{ Authorization = "Bearer $secret" } -TimeoutSec 120
  if (-not $probe.ready -or $probe.variants.Count -ne 10 -or @($probe.variants | Where-Object { $_.title -notmatch 'Bad Bunny' }).Count -ne 0) {
    throw 'Protected publisher plan failed the 10-title Bad Bunny gate'
  }

  $pilot = Invoke-PublishBatch -FromVariant 1 -Count 1 -Secret $secret
  if ($pilot.count -ne 1 -or $pilot.results[0].title -notmatch 'Bad Bunny') {
    throw 'Italian pilot did not pass the live readback gate'
  }

  $rollout = Invoke-PublishBatch -FromVariant 2 -Count 9 -Secret $secret
  if ($rollout.count -ne 9) { throw "Expected 9 rollout listings, got $($rollout.count)" }

  $idempotency = Invoke-PublishBatch -FromVariant 1 -Count 1 -Secret $secret
  if ($idempotency.count -ne 1 -or $idempotency.results[0].id -ne $pilot.results[0].id) {
    throw 'Pilot idempotency readback failed'
  }

  $all = @($pilot.results) + @($rollout.results)
  if ($all.Count -ne 10 -or @($all | Select-Object -ExpandProperty id -Unique).Count -ne 10) {
    throw 'Final listing inventory is not exactly ten unique live Eventbrite events'
  }

  [pscustomobject]@{
    ok = $true
    publishedAndVerified = $all.Count
    pilotIdempotent = $true
    venueId = $pilot.venueId
    affiliateUrl = $pilot.affiliateUrl
    events = @($all | Select-Object id, url, title, marker)
  } | ConvertTo-Json -Depth 6 -Compress
} finally {
  $secret = $null
  [Array]::Clear($secretBytes, 0, $secretBytes.Length)
  if ($envAdded) {
    & npx.cmd vercel env remove BAD_BUNNY_PUBLISH_SECRET production --yes
    if ($LASTEXITCODE -ne 0) {
      Write-Error 'Ephemeral Bad Bunny rollout secret could not be removed.'
    } else {
      Invoke-ProductionDeploy
    }
  }
}
