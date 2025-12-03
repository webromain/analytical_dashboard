#!/bin/bash
# Run backend API (FastAPI / Uvicorn) and open frontend
# Equivalent of run.ps1 for Linux

set -e

# Get script directory (works even if called from another location)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== Analytical Dashboard ==="
echo ""

# Check if venv exists
if [ ! -f ".venv/bin/activate" ]; then
    echo "✗ Virtual env not found. Run ./setup.sh first."
    exit 1
fi

# Activate venv
source .venv/bin/activate
echo "✓ Virtual environment activated"

# Kill any existing processes on our ports
kill_port() {
    local port=$1
    local pid=$(lsof -t -i:$port 2>/dev/null)
    if [ -n "$pid" ]; then
        echo "Killing existing process on port $port (PID: $pid)"
        kill $pid 2>/dev/null || true
        sleep 1
    fi
}

kill_port 8000
kill_port 5500

# Start backend in new terminal or background
echo ""
echo "Starting backend on http://127.0.0.1:8000 ..."

# Try to open in new terminal, fallback to background
if command -v gnome-terminal &> /dev/null; then
    gnome-terminal --title="Backend API" -- bash -c "cd '$SCRIPT_DIR' && source .venv/bin/activate && cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload; exec bash"
elif command -v xterm &> /dev/null; then
    xterm -title "Backend API" -e "cd '$SCRIPT_DIR' && source .venv/bin/activate && cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload" &
elif command -v konsole &> /dev/null; then
    konsole --new-tab -e bash -c "cd '$SCRIPT_DIR' && source .venv/bin/activate && cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload; exec bash" &
else
    # Fallback: run in background
    cd backend
    uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload > /dev/null 2>&1 &
    BACKEND_PID=$!
    cd ..
    echo "  Backend running in background (PID: $BACKEND_PID)"
fi

# Wait for backend to start
sleep 2

# Start frontend static server in new terminal or background
echo ""
echo "Starting static server for frontend on http://127.0.0.1:5500 ..."

if command -v gnome-terminal &> /dev/null; then
    gnome-terminal --title="Frontend Server" -- bash -c "cd '$SCRIPT_DIR/frontend' && python -m http.server 5500 --bind 127.0.0.1; exec bash"
elif command -v xterm &> /dev/null; then
    xterm -title "Frontend Server" -e "cd '$SCRIPT_DIR/frontend' && python -m http.server 5500 --bind 127.0.0.1" &
elif command -v konsole &> /dev/null; then
    konsole --new-tab -e bash -c "cd '$SCRIPT_DIR/frontend' && python -m http.server 5500 --bind 127.0.0.1; exec bash" &
else
    # Fallback: run in background
    cd frontend
    python -m http.server 5500 --bind 127.0.0.1 > /dev/null 2>&1 &
    FRONTEND_PID=$!
    cd ..
    echo "  Frontend running in background (PID: $FRONTEND_PID)"
fi

# Wait for frontend server to start
sleep 1

# Open frontend URL in browser
FRONTEND_URL="http://127.0.0.1:5500/index.html"
echo ""
echo "Opening frontend at $FRONTEND_URL ..."

if command -v xdg-open &> /dev/null; then
    xdg-open "$FRONTEND_URL" 2>/dev/null &
elif command -v open &> /dev/null; then
    open "$FRONTEND_URL" &
elif command -v firefox &> /dev/null; then
    firefox "$FRONTEND_URL" &
elif command -v chromium &> /dev/null; then
    chromium "$FRONTEND_URL" &
elif command -v google-chrome &> /dev/null; then
    google-chrome "$FRONTEND_URL" &
fi

echo ""
echo "========================================"
echo "✓ Services running:"
echo "  Backend:  http://127.0.0.1:8000"
echo "  Frontend: http://127.0.0.1:5500"
echo "========================================"
echo ""
echo "API Endpoints:"
echo "  GET /summary?file_path=../data/sample.csv"
echo "  GET /histogram?file_path=../data/sample.csv&column=value&bins=10"
echo ""

# If running in background mode, setup cleanup
if [ -n "$BACKEND_PID" ] || [ -n "$FRONTEND_PID" ]; then
    echo "Press Ctrl+C to stop background services..."
    
    cleanup() {
        echo ""
        echo "Stopping services..."
        [ -n "$BACKEND_PID" ] && kill $BACKEND_PID 2>/dev/null
        [ -n "$FRONTEND_PID" ] && kill $FRONTEND_PID 2>/dev/null
        echo "Done."
        exit 0
    }
    trap cleanup SIGINT SIGTERM
    
    # Wait indefinitely
    while true; do
        sleep 1
    done
fi
