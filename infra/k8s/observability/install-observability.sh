#!/bin/bash

# Adiciona os repositórios Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Cria namespace
kubectl create namespace observability

# Instala Prometheus
helm install prometheus prometheus-community/kube-prometheus-stack \
    --namespace observability

# Instala Loki
helm repo add grafana https://grafana.github.io/helm-charts
helm install loki grafana/loki-stack \
    --namespace observability \
    --set promtail.enabled=true

# Instala Grafana (se separado)
helm install grafana grafana/grafana \
    --namespace observability \
    --set adminPassword='admin' \
    --set service.type=LoadBalancer

echo "Instalação completa!"
