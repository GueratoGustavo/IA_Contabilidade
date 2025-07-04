#!/bin/bash
set -euo pipefail

# ============================
# 🚀 Blockchain Startup Script
# ============================

# Diretório base (raiz do backend)
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NETWORK_DIR="$ROOT_DIR/network"
CHAINCODE_NAME="auditor"
CHAINCODE_LANG="javascript"
CHAINCODE_PATH="$ROOT_DIR/chaincode/${CHAINCODE_NAME}-js"
LOG_FILE="$ROOT_DIR/logs/blockchain-start.log"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# ============================
# 🧪 Funções auxiliares
# ============================

log() {
    echo "[$TIMESTAMP] $1" | tee -a "$LOG_FILE"
}

check_dependency() {
    command -v "$1" >/dev/null 2>&1 || {
        echo "❌ Erro: '$1' não está instalado. Instale antes de continuar." >&2
        exit 1
    }
}

# ============================
# ✅ Pré-requisitos
# ============================

log "Verificando dependências..."
check_dependency docker
check_dependency peer
check_dependency configtxgen

# ============================
# 🔄 Subindo rede Fabric
# ============================

cd "$NETWORK_DIR"

log "Encerrando qualquer rede anterior..."
./network.sh down >>"$LOG_FILE" 2>&1

log "Iniciando rede e canal..."
./network.sh up createChannel -ca >>"$LOG_FILE" 2>&1

# ============================
# 📦 Deploy do Chaincode
# ============================

log "Fazendo deploy do Chaincode '$CHAINCODE_NAME'..."
./network.sh deployCC \
    -ccn "$CHAINCODE_NAME" \
    -ccp "$CHAINCODE_PATH" \
    -ccl "$CHAINCODE_LANG" >>"$LOG_FILE" 2>&1

# ============================
# ✅ Conclusão
# ============================

log "✅ Blockchain de Auditoria operacional com sucesso!"
