output "namespace_name" {
  description = "Nome do namespace criado"
  value       = kubernetes_namespace.agente_financeiro.metadata[0].name
}

output "nginx_service" {
  description = "NGINX Service"
  value       = helm_release.nginx.name
}
