param(
  [string]$LocaleCsv = 'es,fr,de,pt,nl,ru,tr,zh,ar,bg,hr,cs,da,et,fi,el,hu,ga,lv,lt,mt,pl,ro,sk,sl,sv,no,is,uk,sq,sr,bs,mk',
  [ValidateRange(1, 5)]
  [int]$VariantCount = 5,
  [ValidateRange(0, 180)]
  [int]$WaitForRateLimitMinutes = 0,
  [int]$PublishAttempts = 4
)

$ErrorActionPreference = 'Stop'
$Locales = @($LocaleCsv.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ })
$envAdded = $false
$secretBytes = New-Object byte[] 48
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($secretBytes)
$secret = [Convert]::ToBase64String($secretBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_')
$env:NLM_EPHEMERAL_WORLD_CUP_SECRET = $secret
$endpoint = 'https://nightlifemilan.com/api/events/publish-world-cup-locales'

function Invoke-ProductionDeploy {
  param([int]$Attempts = 3)
  for ($attempt = 1; $attempt -le $Attempts; $attempt += 1) {
    & npx vercel --prod --yes
    if ($LASTEXITCODE -eq 0) { return }
    if ($attempt -lt $Attempts) {
      Write-Output ("DEPLOY_RETRY attempt={0}" -f $attempt)
      Start-Sleep -Seconds (15 * $attempt)
    }
  }
  throw "Production deploy failed after $Attempts attempts"
}

function Wait-ForEventbriteRateLimit {
  param([string]$Secret, [int]$Minutes)
  if ($Minutes -le 0) { return }
  $deadline = [DateTimeOffset]::UtcNow.AddMinutes($Minutes)
  while ($true) {
    $probe = Invoke-RestMethod -Uri "$endpoint`?rateProbe=1" -Method Get -Headers @{ Authorization = "Bearer $Secret" } -TimeoutSec 30
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
    Write-Output ("EVENTBRITE_RATE_LIMIT_WAIT utc={0} retryAfter={1} reset={2}" -f [DateTimeOffset]::UtcNow.ToString('o'), $probe.retryAfter, $probe.rateLimitReset)
    Start-Sleep -Seconds 55
  }
}

try {
  $secret | & npx vercel env add WORLD_CUP_ROLLOUT_SECRET production
  if ($LASTEXITCODE -ne 0) { throw 'Unable to add the ephemeral rollout secret' }
  $envAdded = $true

  Invoke-ProductionDeploy -Attempts 3

  Wait-ForEventbriteRateLimit -Secret $secret -Minutes $WaitForRateLimitMinutes

  & (Join-Path $PSScriptRoot 'publish-world-cup-locales.ps1') -Locales $Locales -FromVariant 1 -VariantCount $VariantCount -MaxAttempts $PublishAttempts
} finally {
  Remove-Item Env:NLM_EPHEMERAL_WORLD_CUP_SECRET -ErrorAction SilentlyContinue
  $secret = $null
  [Array]::Clear($secretBytes, 0, $secretBytes.Length)
  if ($envAdded) {
    & npx vercel env remove WORLD_CUP_ROLLOUT_SECRET production --yes
    if ($LASTEXITCODE -ne 0) {
      Write-Error 'The rollout finished or stopped, but the ephemeral Vercel secret could not be removed.'
    } else {
      try { Invoke-ProductionDeploy -Attempts 3 } catch { Write-Error 'The ephemeral secret was removed from project settings, but the clean production redeploy failed.' }
    }
  }
}
