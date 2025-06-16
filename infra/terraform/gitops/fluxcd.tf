resource "helm_release" "fluxcd" {
  name       = "fluxcd"
  repository = "https://fluxcd-community.github.io/helm-charts"
  chart      = "flux2"
  version    = "2.12.2"
  namespace  = "flux-system"
  create_namespace = true

  values = [
    file("${path.module}/fluxcd-values.yaml")
  ]
}
