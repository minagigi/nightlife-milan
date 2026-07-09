# install-windows-tasks.ps1 - Registra le 4 attivita' pianificate del cervello
# nell'Utilita' di pianificazione di Windows (ORA LOCALE del PC: niente piu'
# conversioni UTC ne' problemi di ora legale).
#
# Uso (PowerShell normale, NON serve amministratore per attivita' utente):
#   powershell -NoProfile -ExecutionPolicy Bypass -File install-windows-tasks.ps1
#
# Per rimuoverle: uninstall-windows-tasks.ps1

$ErrorActionPreference = 'Stop'

$RepoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$Runner   = Join-Path $RepoRoot 'scripts\brain\brain-task.ps1'

if (-not (Test-Path $Runner)) {
  Write-Error "Runner non trovato: $Runner"
}

$Phases = @(
  @{ TaskName = 'Cervello 0400 Analisi';     Phase = '0400-analisi';     Time = '04:00'; Hours = 2 },
  @{ TaskName = 'Cervello 0600 Briefing';    Phase = '0600-briefing';    Time = '06:00'; Hours = 3 },
  @{ TaskName = 'Cervello 1400 Avanzamento'; Phase = '1400-avanzamento'; Time = '14:00'; Hours = 2 },
  @{ TaskName = 'Cervello 2000 Retro';       Phase = '2000-retro';       Time = '20:00'; Hours = 2 }
)

foreach ($P in $Phases) {
  $Action = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$Runner`" -Phase $($P.Phase)" `
    -WorkingDirectory $RepoRoot

  $Trigger = New-ScheduledTaskTrigger -Daily -At $P.Time

  # -WakeToRun: sveglia il PC dalla sospensione (non dallo spegnimento totale).
  # -StartWhenAvailable: se il PC era spento all'orario, esegue appena riacceso.
  $Settings = New-ScheduledTaskSettingsSet -WakeToRun -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Hours $P.Hours)

  Register-ScheduledTask -TaskName $P.TaskName -Action $Action -Trigger $Trigger `
    -Settings $Settings -Description "Cervello AI nightlife-milan - fase $($P.Phase)" -Force | Out-Null

  Write-Host ("Registrata: {0}  (ogni giorno alle {1}, ora locale)" -f $P.TaskName, $P.Time)
}

Write-Host ''
Write-Host 'Fatto. Verifica con: Get-ScheduledTask -TaskName "Cervello*"'
Write-Host 'Prova subito una fase con:'
Write-Host "  powershell -NoProfile -ExecutionPolicy Bypass -File `"$Runner`" -Phase 0400-analisi"
