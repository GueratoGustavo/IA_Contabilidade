terraform {
  required_providers {
    k3s = {
      source  = "rancher/k3s"
      version = "1.0.1"
    }
  }

  required_version = ">= 1.6.0"
}

provider "k3s" {
  kubeconfig_output = "./kubeconfig.yaml"
}

resource "k3s_cluster" "agente_financeiro" {
  cluster_name = "agente-financeiro"
  servers = 1

  agents = 1

  cluster_config {
    disable = ["traefik"]
  }
}

provider "kubernetes" {
  config_path = "./kubeconfig.yaml"
}

provider "helm" {
  kubernetes {
    config_path = "./kubeconfig.yaml"
  }
}

resource "kubernetes_namespace" "agente_financeiro" {
  metadata {
    name = "agente-financeiro"
  }
}

resource "helm_release" "nginx" {
  name       = "nginx"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "nginx"
  version    = "13.2.9"

  namespace = kubernetes_namespace.agente_financeiro.metadata[0].name

  set {
    name  = "service.type"
    value = "NodePort"
  }

  depends_on = [kubernetes_namespace.agente_financeiro]
}
