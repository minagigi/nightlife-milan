# uninstall-windows-tasks.ps1 - Rimuove le 4 attivita' pianificate del cervello.
# Uso: powershell -NoProfile -ExecutionPolicy Bypass -File uninstall-windows-tasks.ps1

$ErrorActionPreference = 'Stop'

$Names = @(
  'Cervello 0400 Analisi',
  'Cervello 0600 Briefing',
  'Cervello 1400 Avanzamento',
  'Cervello 2000 Retro'
)

foreach ($N in $Names) {
  $task = Get-ScheduledTask -TaskName $N -ErrorAction SilentlyContinue
  if ($task) {
    Unregister-ScheduledTask -TaskName $N -Confirm:$false
    Write-Host "Rimossa: $N"
  } else {
    Write-Host "Non trovata (gia' rimossa): $N"
  }
}
