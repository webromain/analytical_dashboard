# Run backend API (FastAPI / Uvicorn) and open frontend
$ErrorActionPreference = "Stop"

$venvActivate = Join-Path (Get-Location) ".venv\\Scripts\\Activate.ps1"
if (Test-Path $venvActivate) { . $venvActivate } else { Write-Error "Virtual env not found. Run ./setup.ps1 first." }

# Start backend
Write-Host "Starting backend on http://127.0.0.1:8000 ..."
push-location backend
Start-Process powershell -ArgumentList "-NoExit","-Command","uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload" | Out-Null
pop-location

# Open frontend
$index = Join-Path (Get-Location) "frontend\\index.html"
if (Test-Path $index) {
  Write-Host "Opening frontend index.html in default browser..."
  Start-Process $index
} else {
  Write-Warning "frontend/index.html not found"
}
