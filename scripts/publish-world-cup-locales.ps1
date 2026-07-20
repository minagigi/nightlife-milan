param(
  [string[]]$Locales = @('es'),
  [int]$FromVariant = 1,
  [ValidateRange(1, 5)]
  [int]$VariantCount = 5,
  [int]$MaxAttempts = 4
)

$ErrorActionPreference = 'Stop'
$endpoint = 'https://nightlifemilan.com/api/events/publish-world-cup-locales'
$tempEnv = Join-Path ([IO.Path]::GetTempPath()) ('nlm-vercel-' + [guid]::NewGuid().ToString('N') + '.env')

function Get-DotEnvValue {
  param([string[]]$Lines, [string]$Name)
  $prefix = "$Name="
  $line = $Lines | Where-Object { $_.StartsWith($prefix, [StringComparison]::Ordinal) } | Select-Object -First 1
  if (-not $line) { return $null }
  $value = $line.Substring($prefix.Length).Trim()
  if ($value.Length -ge 2 -and $value[0] -eq '"' -and $value[$value.Length - 1] -eq '"') {
    try { return ($value | ConvertFrom-Json) } catch { return $value.Substring(1, $value.Length - 2) }
  }
  if ($value.Length -ge 2 -and $value[0] -eq "'" -and $value[$value.Length - 1] -eq "'") {
    return $value.Substring(1, $value.Length - 2)
  }
  return $value
}

function Read-HttpErrorBody {
  param([System.Management.Automation.ErrorRecord]$Record)
  $response = $Record.Exception.Response
  if (-not $response) { return $null }
  try {
    $stream = $response.GetResponseStream()
    if (-not $stream) { return $null }
    $reader = New-Object IO.StreamReader($stream)
    return $reader.ReadToEnd()
  } catch {
    return $null
  }
}

function Invoke-LocaleWave {
  param([string]$Locale, [string]$Secret, [int]$InitialVariant, [int]$RequestedCount, [int]$Attempts)
  $variant = $InitialVariant
  $finalVariant = [Math]::Min(5, $InitialVariant + $RequestedCount - 1)
  $expectedCount = $finalVariant - $InitialVariant + 1
  $allResults = @()
  for ($attempt = 1; $attempt -le $Attempts; $attempt += 1) {
    $remainingCount = $finalVariant - $variant + 1
    $body = @{ locale = $Locale; fromVariant = $variant; max = $remainingCount } | ConvertTo-Json -Compress
    $status = 0
    $responseBody = $null
    try {
      $responseBody = Invoke-RestMethod -Uri $endpoint -Method Post -Headers @{ Authorization = "Bearer $Secret" } -ContentType 'application/json' -Body $body -TimeoutSec 330
      $status = 200
    } catch {
      $status = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
      $raw = Read-HttpErrorBody $_
      if ($raw) {
        try { $responseBody = $raw | ConvertFrom-Json } catch { $responseBody = $null }
      }
      if (-not $responseBody) {
        $responseBody = [pscustomobject]@{ ok = $false; error = $_.Exception.Message }
      }
    }

    $batch = @()
    if ($responseBody.results) { $batch += @($responseBody.results) }
    if ($responseBody.completedBeforeFailure) { $batch += @($responseBody.completedBeforeFailure) }
    if ($responseBody.completedBeforeDeadline) { $batch += @($responseBody.completedBeforeDeadline) }
    foreach ($item in $batch) {
      if (-not ($allResults | Where-Object { $_.marker -eq $item.marker })) { $allResults += $item }
    }

    if ($responseBody.ok -and $allResults.Count -eq $expectedCount) {
      return [pscustomobject]@{ ok = $true; locale = $Locale; attempts = $attempt; results = $allResults }
    }

    $completedVariants = @($allResults | ForEach-Object { [int]$_.variant } | Where-Object { $_ -ge $InitialVariant })
    if ($responseBody.nextVariant) {
      $variant = [int]$responseBody.nextVariant
    } elseif ($completedVariants.Count -gt 0) {
      $variant = ([int]($completedVariants | Measure-Object -Maximum).Maximum) + 1
    }
    if ($variant -gt $finalVariant -and $allResults.Count -eq $expectedCount) {
      return [pscustomobject]@{ ok = $true; locale = $Locale; attempts = $attempt; results = $allResults }
    }

    if ($attempt -lt $Attempts) {
      $delay = @(15, 30, 60, 90)[[Math]::Min($attempt - 1, 3)]
      Write-Output ("RETRY locale={0} attempt={1} status={2} nextVariant={3} error={4}" -f $Locale, $attempt, $status, $variant, $responseBody.error)
      Start-Sleep -Seconds $delay
    } else {
      return [pscustomobject]@{ ok = $false; locale = $Locale; attempts = $attempt; status = $status; error = $responseBody.error; results = $allResults }
    }
  }
}

try {
  $secret = $env:NLM_EPHEMERAL_WORLD_CUP_SECRET
  if (-not $secret) {
    & npx vercel env pull $tempEnv --environment=production --yes | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Unable to load the protected production environment' }
    $lines = Get-Content -LiteralPath $tempEnv
    # Use the task-scoped publication credential first. CRON_SECRET is only a
    # backwards-compatible fallback and may be rotated independently.
    $secret = Get-DotEnvValue $lines 'WORLD_CUP_PUBLISH_SECRET'
    if (-not $secret) { $secret = Get-DotEnvValue $lines 'CRON_SECRET' }
  }
  if (-not $secret) { throw 'No protected publication secret is available' }

  $rollout = @()
  foreach ($locale in $Locales) {
    $lastVariant = [Math]::Min(5, $FromVariant + $VariantCount - 1)
    Write-Output ("START locale={0} variants={1}-{2}" -f $locale, $FromVariant, $lastVariant)
    $result = Invoke-LocaleWave -Locale $locale -Secret $secret -InitialVariant $FromVariant -RequestedCount $VariantCount -Attempts $MaxAttempts
    $rollout += $result
    Write-Output ("DONE locale={0} ok={1} listings={2} attempts={3}" -f $locale, $result.ok, @($result.results).Count, $result.attempts)
    if (-not $result.ok) {
      $result | ConvertTo-Json -Depth 12 -Compress
      throw "Publication failed for locale $locale"
    }
  }
  [pscustomobject]@{
    ok = $true
    localeCount = $rollout.Count
    listingCount = @($rollout | ForEach-Object { $_.results }).Count
    locales = $rollout
  } | ConvertTo-Json -Depth 12 -Compress
} finally {
  if (Test-Path -LiteralPath $tempEnv) { Remove-Item -LiteralPath $tempEnv -Force }
}
