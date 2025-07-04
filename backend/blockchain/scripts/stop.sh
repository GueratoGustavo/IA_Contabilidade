#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NETWORK_DIR="$ROOT_DIR/network"
LOG_FILE="$ROOT_DIR/logs/blockchain-stop.log"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

log() {
    echo "[$TIMESTAMP] $1" | tee -a "$LOG_FILE"
}

cd "$NETWORK_DIR"

log "🛑 Parando rede Hyperledger Fabric..."
./network.sh down >>"$LOG_FILE" 2>&1

log "✅ Rede blockchain finalizada com sucesso."
