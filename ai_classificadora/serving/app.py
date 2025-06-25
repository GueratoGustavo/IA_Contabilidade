from fastapi import FastAPI
from ai_classificadora.serving.routes import router as main_router
from ai_classificadora.monitoring.metrics_middleware import metrics_middleware
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response


def create_app() -> FastAPI:
    app = FastAPI(
        title="IA Classificadora Financeira",
        description=(
            "API REST para classificação automática de dados financeiros."
        ),
        version="1.0.0",
    )

    app.include_router(main_router)

    app.middleware("http")(metrics_middleware)

    @app.get("/metrics")
    def metrics():
        return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

    return app


app = create_app()
