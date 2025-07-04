#!/bin/bash
set -e

echo "🔍 Verificando containers ativos da blockchain:"
docker ps --filter "name=peer" --filter "name=orderer" --format "table {{.Names}}\t{{.Status}}"
