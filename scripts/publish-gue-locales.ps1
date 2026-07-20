param(
  [switch]$NoPause,
  [switch]$DeepAuditOnly,
  [string[]]$Locales = @(
    'en','it','es','fr','de','pt','nl','ru','tr','zh','ar','bg','hr','cs','da','et','fi','el','hu','ga',
    'lv','lt','mt','pl','ro','sk','sl','sv','no','is','uk','sq','sr','bs','mk'
  )
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$Root = Split-Path -Parent $PSScriptRoot
$Endpoint = 'https://nightlifemilan.com/api/events/publish-gue-locales'
$ArtifactDirectory = Join-Path $Root 'artifacts/gue-just-me-2026-07-25'
$ResultPath = Join-Path $ArtifactDirectory 'eventbrite-rollout-results.json'
$DeepResultPath = Join-Path $ArtifactDirectory 'eventbrite-deep-readback.json'
$SecretBytes = New-Object byte[] 32
$Random = [Security.Cryptography.RandomNumberGenerator]::Create()
$Random.GetBytes($SecretBytes)
$Random.Dispose()
$Secret = ($SecretBytes | ForEach-Object { $_.ToString('x2') }) -join ''
$EnvAdded = $false
$Results = [Collections.Generic.List[object]]::new()
$ExpectedMarkerCount = 350
$AuditChunkLimit = 20
$WaveSize = 3
$MaxRequestAttempts = 30

function Invoke-VercelCommand {
  param([Parameter(Mandatory)][string[]]$Arguments)
  & npx.cmd vercel @Arguments
  if ($LASTEXITCODE -ne 0) { throw "Vercel command failed: $($Arguments -join ' ')" }
}

function Read-HttpErrorBody {
  param([System.Management.Automation.ErrorRecord]$Record)
  if ($Record.ErrorDetails -and $Record.ErrorDetails.Message) {
    return [string]$Record.ErrorDetails.Message
  }
  $response = $Record.Exception.Response
  if (-not $response) { return $null }
  $reader = $null
  try {
    $stream = $response.GetResponseStream()
    if (-not $stream) { return $null }
    $reader = New-Object IO.StreamReader($stream)
    return $reader.ReadToEnd()
  } catch {
    return $null
  } finally {
    if ($reader) { $reader.Dispose() }
  }
}

function Get-HttpStatusCode {
  param([System.Management.Automation.ErrorRecord]$Record)
  if (-not $Record.Exception.Response) { return 0 }
  try { return [int]$Record.Exception.Response.StatusCode } catch { return 0 }
}

function Get-RetryDelaySeconds {
  param(
    [System.Management.Automation.ErrorRecord]$Record,
    [Parameter(Mandatory)][int]$Attempt
  )
  $retryAfter = 0
  try {
    $header = [string]$Record.Exception.Response.Headers['Retry-After']
    [void][int]::TryParse($header, [ref]$retryAfter)
  } catch {
    $retryAfter = 0
  }
  if ($retryAfter -gt 0) { return [Math]::Min(60, $retryAfter) }
  if ((Get-HttpStatusCode $Record) -eq 429) { return [Math]::Min(60, 30 + ($Attempt * 10)) }
  return [Math]::Min(45, $Attempt * $Attempt * 3)
}

function Invoke-GueJsonRequest {
  param(
    [Parameter(Mandatory)][string]$Uri,
    [Parameter(Mandatory)][ValidateSet('Get', 'Post')][string]$Method,
    [Parameter(Mandatory)][string]$Operation,
    [string]$Body,
    [int]$TimeoutSec = 300,
    [int[]]$AcceptedErrorStatuses = @()
  )
  $headers = @{ Authorization = "Bearer $Secret" }
  for ($attempt = 1; $attempt -le $MaxRequestAttempts; $attempt += 1) {
    try {
      $request = @{
        Uri = $Uri
        Method = $Method
        Headers = $headers
        TimeoutSec = $TimeoutSec
      }
      if ($Method -eq 'Post') {
        $request.ContentType = 'application/json'
        $request.Body = $Body
      }
      return Invoke-RestMethod @request
    } catch {
      $caught = $_
      $status = Get-HttpStatusCode $_
      $raw = Read-HttpErrorBody $_
      $errorBody = $null
      if ($raw) {
        try {
          $errorBody = $raw | ConvertFrom-Json
          Write-Host "HTTP_ERROR operation=$Operation status=$status error=$($errorBody.error)"
        } catch {
          Write-Host "HTTP_ERROR_RAW operation=$Operation status=$status body=$($raw.Substring(0, [Math]::Min(500, $raw.Length)))"
        }
      }

      if ($AcceptedErrorStatuses -contains $status) {
        if ($errorBody) { return $errorBody }
        throw $caught
      }

      $serverRetryable = $false
      if ($errorBody -and ($errorBody.PSObject.Properties.Name -contains 'retryable')) {
        $serverRetryable = [bool]$errorBody.retryable
      }
      # Vercel surfaces an Eventbrite 429 thrown during a GET audit as a
      # generic 500 response. The audit is read-only and idempotent, so retry
      # 500 here as well; deterministic audit failures still return structured
      # non-transient responses and are rejected below.
      $transientStatus = @(429, 500, 502, 503, 504) -contains $status
      $leaseStillRunning = $status -eq 409 -and $errorBody -and
        [string]$errorBody.error -match 'already running'
      $networkFailure = $status -eq 0
      if (-not ($transientStatus -or $serverRetryable -or $leaseStillRunning -or $networkFailure) -or $attempt -eq $MaxRequestAttempts) {
        throw $caught
      }

      $delay = Get-RetryDelaySeconds -Record $_ -Attempt $attempt
      Write-Host "RETRY operation=$Operation status=$status attempt=$attempt delay=${delay}s"
      Start-Sleep -Seconds $delay
    }
  }
}

function Invoke-GueWave {
  param(
    [Parameter(Mandatory)][string]$Locale,
    [Parameter(Mandatory)][int]$FromVariant,
    [Parameter(Mandatory)][int]$Max
  )
  $body = @{ locale = $Locale; fromVariant = $FromVariant; max = $Max } | ConvertTo-Json -Compress
  return Invoke-GueJsonRequest -Uri $Endpoint -Method Post -Operation "$Locale variant $FromVariant" -Body $body
}

function Invoke-GueAuditChunk {
  param(
    [Parameter(Mandatory)][int]$Offset,
    [Parameter(Mandatory)][int]$Limit
  )
  return Invoke-GueJsonRequest -Uri "$Endpoint`?audit=1&full=1&offset=$Offset&limit=$Limit" -Method Get -Operation "full live audit offset $Offset"
}

function Invoke-GueDeepAuditChunk {
  param(
    [Parameter(Mandatory)][int]$Offset,
    [int]$Limit = 5
  )
  return Invoke-GueJsonRequest -Uri "$Endpoint`?audit=1&full=1&deep=1&offset=$Offset&limit=$Limit" -Method Get -Operation "deep live audit offset $Offset"
}

function Invoke-GueSettingsAuditBatch {
  param([Parameter(Mandatory)][object[]]$Rows)
  $items = ($Rows | ForEach-Object { "$($_.locale):$($_.variant):$($_.event_id)" }) -join ','
  $encoded = [Uri]::EscapeDataString($items)
  return Invoke-GueJsonRequest -Uri "$Endpoint`?audit=1&settingsItems=$encoded" -Method Get -Operation "settings audit $items"
}

function Invoke-GueAudit {
  $offset = 0
  $candidateTotal = -1
  $candidateFingerprint = $null
  $expectedMarkerTotal = -1
  $expectedMarkerFingerprint = $null
  $expectedManifest = @()
  $candidateEvents = [Collections.Generic.List[object]]::new()
  $markerObservations = [Collections.Generic.List[object]]::new()
  $chunks = [Collections.Generic.List[object]]::new()
  $candidateIds = @{}

  for ($chunkNumber = 1; $chunkNumber -le 100; $chunkNumber += 1) {
    $response = Invoke-GueAuditChunk -Offset $offset -Limit $AuditChunkLimit
    if (-not $response.ok -or -not $response.fullAudit) {
      throw "Full audit chunk $chunkNumber failed: $($response | ConvertTo-Json -Depth 8 -Compress)"
    }

    $chunkCandidateTotal = [int]$response.candidateTotal
    $chunkCandidateFingerprint = [string]$response.candidateFingerprint
    $chunkExpectedMarkerTotal = [int]$response.expectedMarkerTotal
    $chunkExpectedMarkerFingerprint = [string]$response.expectedMarkerFingerprint
    $chunkExpectedManifest = @($response.expectedMarkers)
    if ($chunkNumber -eq 1) {
      $candidateTotal = $chunkCandidateTotal
      $candidateFingerprint = $chunkCandidateFingerprint
      $expectedMarkerTotal = $chunkExpectedMarkerTotal
      $expectedMarkerFingerprint = $chunkExpectedMarkerFingerprint
      $expectedManifest = $chunkExpectedManifest
    } elseif ($chunkCandidateTotal -ne $candidateTotal -or $chunkCandidateFingerprint -cne $candidateFingerprint) {
      throw "Full audit candidate set changed at offset $offset"
    } elseif ($chunkExpectedMarkerTotal -ne $expectedMarkerTotal -or $chunkExpectedMarkerFingerprint -cne $expectedMarkerFingerprint) {
      throw "Full audit expected-marker manifest changed at offset $offset"
    }
    if ($chunkExpectedManifest.Count -ne $expectedMarkerTotal) {
      throw "Full audit expected-marker manifest is partial at offset $offset`: $($chunkExpectedManifest.Count)/$expectedMarkerTotal"
    }
    $chunkManifestFingerprint = [string]$response.expectedMarkerFingerprint
    if ($chunkManifestFingerprint -cne $expectedMarkerFingerprint) {
      throw "Full audit expected-marker fingerprint mismatch at offset $offset"
    }

    $chunk = $response.chunk
    $events = @($response.events)
    if ([int]$chunk.offset -ne $offset -or [int]$chunk.limit -ne $AuditChunkLimit) {
      throw "Full audit returned wrong chunk coordinates at offset $offset"
    }
    $expectedReturned = [Math]::Min($AuditChunkLimit, $candidateTotal - $offset)
    if ($expectedReturned -lt 0 -or [int]$chunk.returned -ne $expectedReturned -or $events.Count -ne $expectedReturned) {
      throw "Full audit returned a partial chunk at offset $offset`: $($events.Count)/$expectedReturned"
    }
    for ($eventIndex = 0; $eventIndex -lt $events.Count; $eventIndex += 1) {
      $event = $events[$eventIndex]
      if ([int]$event.candidateIndex -ne ($offset + $eventIndex)) {
        throw "Full audit candidate index gap at offset $offset event $eventIndex"
      }
      $eventId = [string]$event.id
      if (-not $eventId -or $candidateIds.ContainsKey($eventId)) {
        throw "Full audit returned a missing or duplicate candidate ID at offset $offset"
      }
      $candidateIds[$eventId] = $true
      $eventMarkerRows = @($event.markerRows)
      for ($markerIndex = 0; $markerIndex -lt $eventMarkerRows.Count; $markerIndex += 1) {
        $markerRow = $eventMarkerRows[$markerIndex]
        if ([int]$markerRow.occurrence -ne ($markerIndex + 1) -or
          [string]$markerRow.eventId -cne $eventId -or
          [string]$markerRow.status -cne [string]$event.status -or
          [string]$markerRow.observedTitle -cne [string]$event.title -or
          [string]$markerRow.observedStartUtc -cne [string]$event.startUtc) {
          throw "Full audit marker evidence is inconsistent for candidate $eventId"
        }
        $markerObservations.Add($markerRow)
      }
      $candidateEvents.Add($event)
    }

    $chunks.Add([pscustomobject][ordered]@{
      number = $chunkNumber
      offset = [int]$chunk.offset
      limit = [int]$chunk.limit
      returned = [int]$chunk.returned
      nextOffset = $chunk.nextOffset
      complete = [bool]$chunk.complete
      candidateTotal = $candidateTotal
      candidateFingerprint = $candidateFingerprint
      expectedMarkerTotal = $expectedMarkerTotal
      expectedMarkerFingerprint = $expectedMarkerFingerprint
    })

    $consumed = $offset + $events.Count
    if ([bool]$chunk.complete) {
      if ($null -ne $chunk.nextOffset -or $consumed -ne $candidateTotal) {
        throw "Full audit chunk declared premature completion at offset $offset"
      }
      break
    }
    if ($events.Count -eq 0 -or [int]$chunk.nextOffset -ne $consumed) {
      throw "Full audit chunk made no deterministic progress at offset $offset"
    }
    $offset = $consumed
    if ($chunkNumber -eq 100) { throw 'Full audit exceeded 100 chunks' }
  }

  if ($candidateEvents.Count -ne $candidateTotal -or $candidateIds.Count -ne $candidateTotal) {
    throw "Full audit candidate coverage is partial: $($candidateEvents.Count)/$candidateTotal"
  }
  if ($expectedManifest.Count -ne $expectedMarkerTotal) {
    throw "Full audit marker manifest is partial: $($expectedManifest.Count)/$expectedMarkerTotal"
  }

  $expectedByMarker = @{}
  foreach ($expected in $expectedManifest) {
    $marker = [string]$expected.marker
    if (-not $marker -or $expectedByMarker.ContainsKey($marker)) {
      throw "Full audit expected-marker manifest contains a missing or duplicate marker: $marker"
    }
    $expectedByMarker[$marker] = $expected
  }

  $observationsByMarker = @{}
  $unexpectedMarkerRows = [Collections.Generic.List[object]]::new()
  foreach ($observation in $markerObservations) {
    $marker = [string]$observation.marker
    if (-not $expectedByMarker.ContainsKey($marker)) {
      if ([bool]$observation.expected) {
        throw "Full audit marked unexpected row $marker as expected"
      }
      $unexpectedMarkerRows.Add($observation)
      continue
    }
    $expected = $expectedByMarker[$marker]
    $calculatedTitleExact = [string]$observation.observedTitle -ceq [string]$expected.title
    $calculatedDateExact = [string]$observation.observedStartUtc -ceq [string]$expected.startUtc
    if (-not [bool]$observation.expected -or
      [string]$observation.expectedLocale -cne [string]$expected.locale -or
      [int]$observation.expectedVariant -ne [int]$expected.variant -or
      [string]$observation.expectedTitle -cne [string]$expected.title -or
      [string]$observation.expectedStartUtc -cne [string]$expected.startUtc -or
      [bool]$observation.titleExact -ne $calculatedTitleExact -or
      [bool]$observation.dateExact -ne $calculatedDateExact -or
      -not ($observation.PSObject.Properties.Name -contains 'contentCurrent')) {
      throw "Full audit expected-marker evidence is inconsistent for $marker"
    }
    if (-not $observationsByMarker.ContainsKey($marker)) {
      $observationsByMarker[$marker] = [Collections.Generic.List[object]]::new()
    }
    $observationsByMarker[$marker].Add($observation)
  }

  $rows = [Collections.Generic.List[object]]::new()
  foreach ($expected in $expectedManifest) {
    $marker = [string]$expected.marker
    # Wrap the whole conditional so PowerShell preserves a real zero-item
    # array under StrictMode instead of assigning $null for a missing marker.
    $observations = @(if ($observationsByMarker.ContainsKey($marker)) { $observationsByMarker[$marker] })
    $live = @($observations | Where-Object { @('live', 'started') -contains [string]$_.status })
    $drafts = @($observations | Where-Object { [string]$_.status -eq 'draft' })
    $unknown = @($observations | Where-Object { @('live', 'started', 'draft') -notcontains [string]$_.status })
    $rows.Add([pscustomobject][ordered]@{
      marker = $marker
      locale = [string]$expected.locale
      variant = [int]$expected.variant
      expectedTitle = [string]$expected.title
      expectedStartUtc = [string]$expected.startUtc
      occurrences = $observations.Count
      eventIds = @($observations | ForEach-Object { [string]$_.eventId })
      live = $live.Count
      drafts = $drafts.Count
      unknown = $unknown.Count
      liveIds = @($live | ForEach-Object { [string]$_.eventId })
      draftIds = @($drafts | ForEach-Object { [string]$_.eventId })
      unknownIds = @($unknown | ForEach-Object { [string]$_.eventId })
      observedTitles = @($observations | ForEach-Object { [string]$_.observedTitle })
      observedStartUtc = @($observations | ForEach-Object { [string]$_.observedStartUtc })
      titleExact = $live.Count -eq 1 -and [bool]$live[0].titleExact
      dateExact = $live.Count -eq 1 -and [bool]$live[0].dateExact
      contentCurrent = $live.Count -eq 1 -and [bool]$live[0].contentCurrent
    })
  }

  $liveIdCounts = @{}
  foreach ($row in $rows) {
    foreach ($liveId in $row.liveIds) {
      $key = [string]$liveId
      $liveIdCounts[$key] = 1 + [int]$liveIdCounts[$key]
    }
  }
  $failures = @($rows | Where-Object { -not (Test-GueAuditRowComplete -Row $_ -LiveIdCounts $liveIdCounts) })
  $duplicateMarkerRows = @($rows | Where-Object { [int]$_.occurrences -gt 1 })
  $changedTitleRows = @($markerObservations | Where-Object { $_.expected -and -not $_.titleExact })
  $identityCollisions = @($liveIdCounts.GetEnumerator() |
    Where-Object { [int]$_.Value -gt 1 } |
    ForEach-Object { [pscustomobject]@{ liveId = [string]$_.Key; markerRows = [int]$_.Value } })
  $allLiveIds = @($rows | ForEach-Object { @($_.liveIds) })
  $uniqueLiveIds = @($allLiveIds | Sort-Object -Unique).Count
  $draftTotal = [int](($rows | Measure-Object -Property drafts -Sum).Sum)
  $unknownStatusTotal = [int](($rows | Measure-Object -Property unknown -Sum).Sum)
  $ok = $rows.Count -eq $expectedMarkerTotal -and
    $failures.Count -eq 0 -and
    $unexpectedMarkerRows.Count -eq 0 -and
    $identityCollisions.Count -eq 0 -and
    $uniqueLiveIds -eq $expectedMarkerTotal

  return [pscustomobject][ordered]@{
    ok = $ok
    fullAudit = $true
    expected = $expectedMarkerTotal
    liveExact = $rows.Count - $failures.Count
    uniqueLiveIds = $uniqueLiveIds
    draftTotal = $draftTotal
    unknownStatusTotal = $unknownStatusTotal
    locales = @($expectedManifest | ForEach-Object { [string]$_.locale } | Select-Object -Unique)
    candidateTotal = $candidateTotal
    candidateFingerprint = $candidateFingerprint
    expectedMarkerFingerprint = $expectedMarkerFingerprint
    # Windows PowerShell serializes Generic.List as "@{...}" strings when it
    # is nested inside this evidence object. Materialize real object arrays so
    # the saved rollout JSON remains machine-readable.
    rows = $rows.ToArray()
    failures = $failures
    unexpectedMarkerRows = $unexpectedMarkerRows.ToArray()
    duplicateMarkerRows = $duplicateMarkerRows
    changedTitleRows = $changedTitleRows
    identityCollisions = $identityCollisions
    candidateEvents = $candidateEvents.ToArray()
    chunks = $chunks.ToArray()
  }
}

function Test-GueAuditRowComplete {
  param(
    [Parameter(Mandatory)][object]$Row,
    [Parameter(Mandatory)][hashtable]$LiveIdCounts
  )
  if ([int]$Row.occurrences -ne 1 -or [int]$Row.live -ne 1 -or [int]$Row.drafts -ne 0 -or
    [int]$Row.unknown -ne 0 -or -not $Row.titleExact -or -not $Row.dateExact -or -not $Row.contentCurrent) {
    return $false
  }
  $liveId = [string]$Row.liveIds[0]
  return $liveId -and [int]$LiveIdCounts[$liveId] -eq 1
}

function Wait-EventbriteRateWindow {
  for ($attempt = 1; $attempt -le 120; $attempt += 1) {
    $probe = Invoke-GueJsonRequest -Uri "$Endpoint`?rateProbe=1" -Method Get -Operation 'Eventbrite readiness probe' -TimeoutSec 60
    if ($probe.ok -and [int]$probe.eventbriteStatus -lt 400) {
      Write-Host "EVENTBRITE_RATE_READY attempt=$attempt"
      return
    }
    if ([int]$probe.eventbriteStatus -ne 429) {
      throw "Eventbrite readiness probe failed: $($probe | ConvertTo-Json -Depth 5 -Compress)"
    }
    $retryAfter = 0
    if ($probe.retryAfter) { [void][int]::TryParse([string]$probe.retryAfter, [ref]$retryAfter) }
    $delay = if ($retryAfter -gt 0) { [Math]::Min(120, $retryAfter) } else { 30 }
    Write-Host "EVENTBRITE_RATE_WAIT attempt=$attempt delay=${delay}s"
    Start-Sleep -Seconds $delay
  }
  throw 'Eventbrite rate limit did not reopen after 120 readiness probes'
}

New-Item -ItemType Directory -Force -Path $ArtifactDirectory | Out-Null
Push-Location $Root
try {
  if ($Locales.Count -ne 35 -or @($Locales | Select-Object -Unique).Count -ne 35) {
    throw 'The Guè rollout requires all 35 unique enabled locales so the final audit can prove the 350-marker bijection'
  }
  $Secret | & npx.cmd vercel env add GUE_ROLLOUT_SECRET production
  if ($LASTEXITCODE -ne 0) { throw 'Unable to add the ephemeral Guè rollout secret' }
  $EnvAdded = $true
  Invoke-VercelCommand -Arguments @('--prod', '--yes')
  Wait-EventbriteRateWindow

  if ($DeepAuditOnly) {
    $publicPath = Join-Path $ArtifactDirectory 'eventbrite-public-readback.json'
    if (-not (Test-Path -LiteralPath $publicPath)) { throw 'Run the public Eventbrite crawler before the settings audit' }
    $publicEvidence = Get-Content -LiteralPath $publicPath -Raw | ConvertFrom-Json
    if ([int]$publicEvidence.passed -ne $ExpectedMarkerCount -or [int]$publicEvidence.uniqueEventIds -ne $ExpectedMarkerCount) {
      throw 'Public Eventbrite readback is not complete for 350 unique live IDs'
    }
    $links = @(Import-Csv -LiteralPath (Join-Path $ArtifactDirectory 'eventbrite-links.csv'))
    if ($links.Count -ne $ExpectedMarkerCount) { throw 'Eventbrite links CSV does not contain 350 rows' }
    $settingsRows = [Collections.Generic.List[object]]::new()
    for ($offset = 0; $offset -lt $links.Count; $offset += 5) {
      $batch = @($links[$offset..([Math]::Min($offset + 4, $links.Count - 1))])
      $response = Invoke-GueSettingsAuditBatch -Rows $batch
      if (-not $response.ok -or @($response.results).Count -ne $batch.Count) {
        throw "Settings audit batch at offset $offset failed: $($response | ConvertTo-Json -Depth 6 -Compress)"
      }
      foreach ($verified in @($response.results)) {
        $failedChecks = @($verified.checks.PSObject.Properties | Where-Object { -not [bool]$_.Value } | ForEach-Object Name)
        if (-not $verified.ok -or $failedChecks.Count -gt 0) {
          throw "Settings audit event $($verified.eventId) failed: $($failedChecks -join ', ')"
        }
        $settingsRows.Add($verified)
      }
      Write-Host "SETTINGS_AUDIT_PROGRESS checked=$($settingsRows.Count)/$ExpectedMarkerCount"
    }

    $uniqueIds = @($settingsRows | ForEach-Object { $_.eventId } | Sort-Object -Unique)
    $uniqueMarkers = @($settingsRows | ForEach-Object { $_.marker } | Sort-Object -Unique)
    if ($settingsRows.Count -ne $ExpectedMarkerCount -or $uniqueIds.Count -ne $ExpectedMarkerCount -or $uniqueMarkers.Count -ne $ExpectedMarkerCount) {
      throw "Settings audit coverage failed: rows=$($settingsRows.Count) ids=$($uniqueIds.Count) markers=$($uniqueMarkers.Count)"
    }
    $settingsById = @{}
    foreach ($row in $settingsRows) { $settingsById[[string]$row.eventId] = $row }
    $deepRows = [Collections.Generic.List[object]]::new()
    foreach ($publicRow in @($publicEvidence.rows)) {
      $settingsRow = $settingsById[[string]$publicRow.eventId]
      if (-not $settingsRow) { throw "Missing settings evidence for Eventbrite $($publicRow.eventId)" }
      $deepRows.Add([pscustomobject][ordered]@{
        locale = [string]$publicRow.locale
        variant = [int]$publicRow.variant
        eventId = [string]$publicRow.eventId
        marker = [string]$settingsRow.marker
        url = [string]$publicRow.url
        finalUrl = [string]$publicRow.finalUrl
        publicChecks = $publicRow.checks
        settingsChecks = $settingsRow.checks
      })
    }
    $deepEvidence = [ordered]@{
      checkedAt = (Get-Date).ToUniversalTime().ToString('o')
      ok = $true
      expected = $ExpectedMarkerCount
      passed = $deepRows.Count
      uniqueLiveIds = $uniqueIds.Count
      uniqueMarkers = $uniqueMarkers.Count
      publicReadbackCheckedAt = [string]$publicEvidence.checkedAt
      coverLocalesPassed = [int]$publicEvidence.coversPassed
      rows = $deepRows.ToArray()
    }
    $deepEvidence | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $DeepResultPath -Encoding utf8
    Write-Host "DEEP_AUDIT_COMPLETE passed=$($deepRows.Count) evidence=$DeepResultPath"
    return
  }

  # Reconstruct the checkpoint from exact live markers. The audit is the source
  # of truth after a local process exit, deployment change, or lost HTTP reply.
  $initialAudit = Invoke-GueAudit
  if ([int]$initialAudit.expected -ne $ExpectedMarkerCount -or @($initialAudit.rows).Count -ne $ExpectedMarkerCount) {
    throw "Resume audit expected-marker coverage is not $ExpectedMarkerCount"
  }
  $liveIdCounts = @{}
  foreach ($row in $initialAudit.rows) {
    foreach ($liveId in $row.liveIds) {
      $key = [string]$liveId
      $liveIdCounts[$key] = 1 + [int]$liveIdCounts[$key]
    }
  }
  $completedMarkers = @{}
  foreach ($row in $initialAudit.rows) {
    if (Test-GueAuditRowComplete -Row $row -LiveIdCounts $liveIdCounts) {
      $completedMarkers["$($row.locale):$($row.variant)"] = $true
    }
  }
  Write-Host "RESUME_AUDIT complete=$($completedMarkers.Count) expected=$($initialAudit.expected) candidates=$($initialAudit.candidateTotal) chunks=$(@($initialAudit.chunks).Count)"

  $pilotUrl = $null
  $pilotEventId = $null
  if ($completedMarkers.ContainsKey('en:1')) {
    $pilotRow = $initialAudit.rows | Where-Object { $_.locale -eq 'en' -and [int]$_.variant -eq 1 } | Select-Object -First 1
    $pilotEventId = [string]$pilotRow.liveIds[0]
    Write-Host "PILOT_ALREADY_LIVE eventId=$pilotEventId"
  } else {
    $pilot = Invoke-GueWave -Locale 'en' -FromVariant 1 -Max 1
    if (-not $pilot.ok -or $pilot.publishedAndVerified -ne 1) {
      throw "English pilot failed: $($pilot | ConvertTo-Json -Depth 8 -Compress)"
    }
    $Results.Add($pilot)
    $completedMarkers['en:1'] = $true
    $pilotUrl = [string]$pilot.results[0].url
    $pilotEventId = [string]$pilot.results[0].id
    Write-Host "PILOT_READY $pilotUrl"
    if (-not $NoPause) {
      Write-Host 'Press ENTER after the public pilot has been inspected.'
      [void][Console]::ReadLine()
    }
  }

  foreach ($locale in $Locales) {
    $fromVariant = 1
    while ($fromVariant -le 10) {
      if ($completedMarkers.ContainsKey("$locale`:$fromVariant")) {
        Write-Host "RESUME_SKIP locale=$locale variant=$fromVariant"
        $fromVariant += 1
        continue
      }
      # Three listings per request amortize inventory/dedupe work while the
      # route deadline and exact-marker resume keep partial waves safe.
      $remaining = 11 - $fromVariant
      $wave = Invoke-GueWave -Locale $locale -FromVariant $fromVariant -Max ([Math]::Min($WaveSize, $remaining))
      $Results.Add($wave)
      if ($wave.ok) {
        $completed = [int]$wave.publishedAndVerified
        if ($completed -lt 1) { throw "Rollout made no progress for $locale from variant $fromVariant" }
        $completedMarkers["$locale`:$fromVariant"] = $true
        $fromVariant += $completed
      } elseif ($wave.retryable -and $wave.nextVariant) {
        $fromVariant = [int]$wave.nextVariant
      } else {
        throw "Rollout failed for $locale from variant $fromVariant`: $($wave | ConvertTo-Json -Depth 8 -Compress)"
      }
      Write-Host "LOCALE_DONE $locale completed=$($wave.publishedAndVerified) next=$fromVariant"
    }
  }

  # The full audit hydrates every event at the exact Guè start time before
  # checking markers. The marker and event ID are the resume identity; a
  # manually edited title must never make a published listing undiscoverable.
  $audit = Invoke-GueAudit
  if (-not $audit.ok -or
    [int]$audit.expected -ne $ExpectedMarkerCount -or
    @($audit.rows).Count -ne $ExpectedMarkerCount -or
    [int]$audit.liveExact -ne $ExpectedMarkerCount -or
    [int]$audit.uniqueLiveIds -ne $ExpectedMarkerCount -or
    [int]$audit.draftTotal -ne 0 -or
    @($audit.unexpectedMarkerRows).Count -ne 0 -or
    @($audit.duplicateMarkerRows).Count -ne 0 -or
    @($audit.identityCollisions).Count -ne 0) {
    throw "Final audit failed: $($audit | ConvertTo-Json -Depth 8 -Compress)"
  }
  $evidence = [ordered]@{
    completedAt = (Get-Date).ToUniversalTime().ToString('o')
    pilotUrl = $pilotUrl
    pilotEventId = $pilotEventId
    initialAudit = $initialAudit
    audit = $audit
    waves = $Results
  }
  $evidence | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $ResultPath -Encoding utf8
  Write-Host "ROLLOUT_COMPLETE expected=$($audit.expected) liveExact=$($audit.liveExact) uniqueLiveIds=$($audit.uniqueLiveIds) chunks=$(@($audit.chunks).Count) evidence=$ResultPath"
} finally {
  $Secret = $null
  [Array]::Clear($SecretBytes, 0, $SecretBytes.Length)
  if ($EnvAdded) {
    try {
      & npx.cmd vercel env rm GUE_ROLLOUT_SECRET production --yes
      if ($LASTEXITCODE -ne 0) { throw 'Could not remove GUE_ROLLOUT_SECRET automatically' }
      Invoke-VercelCommand -Arguments @('--prod', '--yes')
    } catch {
      Write-Warning "Ephemeral secret cleanup or final redeploy failed: $($_.Exception.Message)"
    }
  }
  Pop-Location
}
