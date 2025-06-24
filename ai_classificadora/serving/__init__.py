"""
Módulo `serving` da IA Classificadora.

Este pacote expõe a interface de serviço do modelo treinado via API REST com 
FastAPI.
Componentes principais:
- `app`: instância da aplicação FastAPI
- `routes`: define os endpoints da API
- `schemas`: define os modelos de entrada e saída (via Pydantic)
- `services`: executa a inferência do modelo
- `dependencies`: carrega o modelo treinado e injeta nas rotas
"""


__all__ = [
    "app",
    "router",
    "PredictRequest",
    "PredictResponse",
    "make_prediction",
    "get_model",
]
