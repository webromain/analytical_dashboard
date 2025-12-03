#!/bin/bash
# Setup environment on a fresh Linux machine
# - Installs Python 3 and Node.js if missing (via apt/dnf/pacman)
# - Creates Python venv and installs backend requirements
# - Installs minimal Node deps for frontend tests

set -e

# Get script directory (works even if called from another location)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== Analytical Dashboard Setup ==="
echo ""

# Detect package manager
detect_pkg_manager() {
    if command -v apt &> /dev/null; then
        echo "apt"
    elif command -v dnf &> /dev/null; then
        echo "dnf"
    elif command -v pacman &> /dev/null; then
        echo "pacman"
    else
        echo "unknown"
    fi
}

PKG_MANAGER=$(detect_pkg_manager)

# Function to install packages
install_package() {
    local pkg_apt=$1
    local pkg_dnf=$2
    local pkg_pacman=$3
    
    echo "Installing $pkg_apt..."
    case $PKG_MANAGER in
        apt)
            sudo apt update && sudo apt install -y $pkg_apt
            ;;
        dnf)
            sudo dnf install -y $pkg_dnf
            ;;
        pacman)
            sudo pacman -S --noconfirm $pkg_pacman
            ;;
        *)
            echo "✗ Unknown package manager. Please install manually."
            return 1
            ;;
    esac
}

# Check for Python 3
if command -v python3 &> /dev/null; then
    echo "✓ Python3 found: $(python3 --version)"
else
    echo "✗ Python3 not found. Installing..."
    install_package "python3 python3-venv python3-pip" "python3 python3-pip" "python python-pip"
fi

# Check for python3-venv module
if ! python3 -m venv --help &> /dev/null 2>&1; then
    echo "✗ python3-venv module missing. Installing..."
    install_package "python3-venv" "python3-libs" "python"
fi

# Check for Node.js (optional, for frontend tests)
if command -v node &> /dev/null; then
    echo "✓ Node.js found: $(node --version)"
else
    echo "⚠ Node.js not found (optional, only needed for frontend tests)"
    read -p "Install Node.js? [y/N] " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        install_package "nodejs npm" "nodejs npm" "nodejs npm"
    fi
fi

# Create venv
echo ""
echo "Creating Python venv in .venv..."
python3 -m venv .venv

# Activate venv in this session
source .venv/bin/activate

# Upgrade pip
echo ""
echo "Upgrading pip..."
python -m pip install --upgrade pip

# Install backend requirements
echo ""
echo "Installing backend requirements..."
pip install -r backend/requirements.txt

# Frontend info
echo ""
echo "Frontend ready (using CDN for Chart.js)."

echo ""
echo "========================================"
echo "✓ Setup completed successfully!"
echo "========================================"
echo ""
echo "To start the project, run:"
echo "  ./run.sh"
echo ""
