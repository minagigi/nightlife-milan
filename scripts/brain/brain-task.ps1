# brain-task.ps1 - Esegue UNA fase del cervello in locale (headless).
# Uso:  powershell -NoProfile -ExecutionPolicy Bypass -File brain-task.ps1 -Phase 0400-analisi
# Fasi: 0400-analisi | 0600-briefing | 1400-avanzamento | 2000-retro
#
# Prerequisiti sul PC (vedi .claude/brain/LOCAL-WINDOWS.md):
#   - Claude Code CLI installata e autenticata ("claude" nel PATH)
#   - git con credenziali push per il repo
#   - GitHub CLI "gh" autenticata (gh auth login) per aprire le PR

param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('0400-analisi', '0600-briefing', '1400-avanzamento', '2000-retro')]
  [string]$Phase
)

# NOTA: niente $ErrorActionPreference='Stop' — in Windows PowerShell 5.1 lo stderr
# dei comandi nativi rediretto con 2>&1 (git scrive li' il progresso) diventerebbe
# un errore fatale fasullo. Gli errori veri si gestiscono con gli exit code.
$ErrorActionPreference = 'Continue'

# La radice del repo e' due livelli sopra questo script (scripts/brain/ -> repo)
$RepoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $RepoRoot

$Stamp  = Get-Date -Format 'yyyy-MM-dd'
$LogDir = Join-Path $RepoRoot '.claude\brain\logs'
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
$Log = Join-Path $LogDir "$Stamp-$Phase.log"

function Write-Log([string]$Message) {
  $line = "[{0}] {1}" -f (Get-Date -Format 'HH:mm:ss'), $Message
  $line | Tee-Object -FilePath $Log -Append
}

Write-Log "=== Cervello fase $Phase - avvio ==="

# Verifica prerequisiti prima di partire: meglio un log chiaro che un fallimento muto.
foreach ($cmd in @('claude', 'git', 'gh')) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    Write-Log "ERRORE: '$cmd' non trovato nel PATH. Vedi .claude/brain/LOCAL-WINDOWS.md"
    exit 1
  }
}

git fetch origin 2>&1 | Tee-Object -FilePath $Log -Append | Out-Null

$PromptFile = Join-Path $RepoRoot ".claude\brain\prompts\$Phase.md"
if (-not (Test-Path $PromptFile)) {
  Write-Log "ERRORE: prompt non trovato: $PromptFile"
  exit 1
}
$Prompt = Get-Content -Raw -Encoding UTF8 $PromptFile

Write-Log "Lancio Claude Code (modello: cervello Fable 5; gli esecutori Sonnet li lancia lui)..."

# Il prompt viaggia su stdin per evitare limiti di lunghezza degli argomenti.
# --permission-mode dontAsk: nessun prompt interattivo (coerente con .claude/settings.json).
$Output = $Prompt | & claude -p --model claude-fable-5 --permission-mode dontAsk 2>&1 | Out-String
$ExitCode = $LASTEXITCODE

$Output | Tee-Object -FilePath $Log -Append | Out-Null

# Alle 06:00 lo stdout della sessione E' il briefing del mattino: salvalo a parte.
if ($Phase -eq '0600-briefing') {
  $BriefDir = Join-Path $RepoRoot '.claude\brain\briefings'
  New-Item -ItemType Directory -Force -Path $BriefDir | Out-Null
  $BriefFile = Join-Path $BriefDir "$Stamp.md"
  $Output | Out-File -Encoding UTF8 $BriefFile
  Write-Log "Briefing salvato in $BriefFile"
}

if ($ExitCode -ne 0) {
  Write-Log "ERRORE: Claude Code e' uscito con codice $ExitCode"
  exit $ExitCode
}

Write-Log "=== Cervello fase $Phase - completata ==="
