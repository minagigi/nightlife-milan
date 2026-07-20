$ErrorActionPreference = 'Stop'
$workspace = (Resolve-Path '.').Path
$tempFile = Join-Path $workspace '.codex-work\worldcup-diagnostic.env'
$parent = (Resolve-Path (Split-Path $tempFile -Parent)).Path
if (-not $parent.StartsWith($workspace, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw 'Unsafe diagnostic env target'
}

try {
  & npx.cmd vercel env pull $tempFile --environment production --yes | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'Unable to pull production environment for diagnostic' }
  $line = Get-Content -LiteralPath $tempFile | Where-Object { $_ -match '^\s*EVENTBRITE_TOKEN=' } | Select-Object -First 1
  $token = (($line -split '=', 2)[1].Trim().Trim('"').Trim("'"))
  if ($token.Length -lt 20) { throw 'Production Eventbrite token is unavailable' }
  $headers = @{ Authorization = "Bearer $token" }
  $base = 'https://www.eventbriteapi.com/v3/organizations/2988002072164/events/?status=live&order_by=start_asc&page_size=200&time_filter=current_future'
  $marker = 'nlm:curated=wc26-final-v1-ar-2026-07-19'
  $continuation = $null
  $target = $null
  do {
    $uri = if ($continuation) { "$base&continuation=$([uri]::EscapeDataString($continuation))" } else { $base }
    $page = Invoke-RestMethod -Uri $uri -Headers $headers -TimeoutSec 120
    $target = @($page.events | Where-Object { $_.description.html -like "*$marker*" }) | Select-Object -First 1
    $continuation = if ($page.pagination.has_more_items) { $page.pagination.continuation } else { $null }
  } while (-not $target -and $continuation)
  if (-not $target) { throw 'Arabic v1 target not found' }

  $html = [string]$target.description.html
  $imgTags = @([regex]::Matches($html, '<img\b[^>]*>', 'IgnoreCase') | ForEach-Object { $_.Value })
  [pscustomobject]@{
    EventId = $target.id
    Status = $target.status
    HtmlLength = $html.Length
    ImageCount = $imgTags.Count
    FaqDataCount = ([regex]::Matches($html, 'data-event-faq="true"', 'IgnoreCase')).Count
    H3Count = ([regex]::Matches($html, '<h3\b', 'IgnoreCase')).Count
    ResponsiveRegexCount = ([regex]::Matches($html, '<img\b[^>]*style="[^"]*width:\s*100%[^"]*max-width:\s*100%[^"]*height:\s*auto[^"]*"[^>]*>', 'IgnoreCase')).Count
    ExactStyleCount = ([regex]::Matches($html, 'style="display:block;width:100%;max-width:100%;height:auto"', 'IgnoreCase')).Count
    AltCount = ([regex]::Matches($html, '\balt="[^"]+"', 'IgnoreCase')).Count
    TitleCount = ([regex]::Matches($html, '\btitle="[^"]+"', 'IgnoreCase')).Count
    HasAffiliate = $html.Contains('https://xceed.me/en/milano/event/fifa-2026-final/238627/channel/nightlifemilan-1')
    HasMarker = $html.Contains($marker)
    ImageTags = $imgTags
  } | ConvertTo-Json -Depth 4
} finally {
  $token = $null
  if (Test-Path -LiteralPath $tempFile) { Remove-Item -LiteralPath $tempFile -Force }
}
