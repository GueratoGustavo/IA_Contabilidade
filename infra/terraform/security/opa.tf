resource "helm_release" "opa" {
  name       = "gatekeeper"
  repository = "https://open-policy-agent.github.io/gatekeeper/charts"
  chart      = "gatekeeper"
  version    = "3.15.0"
  namespace  = "gatekeeper-system"
  create_namespace = true
}
