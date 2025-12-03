# Setup environment on a fresh Windows machine
# - Installs Python 3.12 and Node.js LTS via winget if missing
# - Creates Python venv and installs backend requirements
# - Installs minimal Node deps for frontend tests
# Si votre pc vous empêche de démarrer les fichier de config :
# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

$ErrorActionPreference = "Stop"

function Ensure-Command($name, $wingetId) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    Write-Host "Installing $name via winget..."
    winget install -e --id $wingetId --accept-package-agreements --accept-source-agreements
  } else {
    Write-Host "$name found."
  }
}

Ensure-Command -name python -wingetId "Python.Python.3.12"
Ensure-Command -name node -wingetId "OpenJS.NodeJS.LTS"

# Refresh PATH for current session
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Create venv
Write-Host "Creating Python venv in .venv..."
python -m venv .venv

# Activate venv in this session
$venvActivate = Join-Path (Get-Location) ".venv\\Scripts\\Activate.ps1"
. $venvActivate

# Install backend requirements
Write-Host "Installing backend requirements..."
push-location backend
python -m pip install -U pip
python -m pip install -r requirements.txt
pop-location

# Install frontend dev deps (none required for runtime; tests use plain Node)
Write-Host "Frontend ready (using CDN for Chart.js)."

# Activer l'environnement virtuel
.venv\Scripts\Activate.ps1

# Aller dans le dossier backend et lancer les tests Python
Set-Location backend
$env:PYTHONPATH="."
pytest -v app/tests/

# Aller dans le dossier frontend et lancer le test Node.js
Set-Location ..\frontend
node tests\test_ui.js

# Retourner au dossier racine
Set-Location ..

Write-Host "Setup completed. Use ./run.ps1 to start the backend."
