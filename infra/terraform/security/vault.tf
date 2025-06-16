resource "helm_release" "vault" {
  name       = "vault"
  repository = "https://helm.releases.hashicorp.com"
  chart      = "vault"
  version    = "0.25.0"
  namespace  = "vault"
  create_namespace = true

  set {
    name  = "server.dev.enabled"
    value = "true"
  }
}
