provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
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
  namespace  = kubernetes_namespace.agente_financeiro.metadata[0].name

  set {
    name  = "service.type"
    value = "NodePort"
  }
}
