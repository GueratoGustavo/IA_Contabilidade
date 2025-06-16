variable "namespace" {
  description = "Namespace para os recursos Kubernetes"
  type        = string
  default     = "agente-financeiro"
}

variable "nginx_chart_version" {
  description = "Versão do chart Helm do NGINX"
  type        = string
  default     = "15.5.1"
}
