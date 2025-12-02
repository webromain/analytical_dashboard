# Run backend API (FastAPI / Uvicorn) and open frontend
$ErrorActionPreference = "Stop"

$venvActivate = Join-Path (Get-Location) ".venv\\Scripts\\Activate.ps1"
if (Test-Path $venvActivate) { . $venvActivate } else { Write-Error "Virtual env not found. Run ./setup.ps1 first." }

# Start backend
Write-Host "Starting backend on http://127.0.0.1:8000 ..."
push-location backend
Start-Process powershell -ArgumentList "-NoExit","-Command","uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload" | Out-Null
pop-location

# Serve frontend over HTTP to avoid file:// module restrictions
push-location frontend
Write-Host "Starting static server for frontend on http://127.0.0.1:5500 ..."
Start-Process powershell -ArgumentList "-NoExit","-Command","python -m http.server 5500 --bind 127.0.0.1" | Out-Null
pop-location

# Open frontend URL
$frontendUrl = "http://127.0.0.1:5500/index.html"
Write-Host "Opening frontend at $frontendUrl ..."
Start-Process $frontendUrl
