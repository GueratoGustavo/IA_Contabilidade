output "namespace_name" {
  value = kubernetes_namespace.agente_financeiro.metadata[0].name
}

output "nginx_release_name" {
  value = helm_release.nginx.name
}
