from time import time
from fastapi import Request
from prometheus_client import Counter, Histogram

REQUEST_COUNT = Counter(
    "api_requests_total",
    "Número total de requisições recebidas",
    ["method", "endpoint", "http_status"],
)

REQUEST_LATENCY = Histogram(
    "api_request_duration_seconds",
    "Duração das requisições da API em segundos",
    ["endpoint"],
)


async def metrics_middleware(request: Request, call_next):
    """
    Middleware para capturar métricas de uso da API com Prometheus.
    """
    start_time = time()
    response = await call_next(request)
    process_time = time() - start_time

    REQUEST_LATENCY.labels(endpoint=request.url.path).observe(process_time)
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.url.path,
        http_status=response.status_code,
    ).inc()

    return response
