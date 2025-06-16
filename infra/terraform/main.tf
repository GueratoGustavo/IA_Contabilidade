provider "kubernetes" {
  config_path = pathexpand("~/.kube/config")
}

provider "helm" {
  kubernetes {
    config_path = pathexpand("~/.kube/config")
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
  version    = "13.2.9"  # substitua pela versão válida encontrada

  namespace = kubernetes_namespace.agente_financeiro.metadata[0].name

  set {
    name  = "service.type"
    value = "NodePort"
  }

  depends_on = [kubernetes_namespace.agente_financeiro]
}
