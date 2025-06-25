from fastapi import FastAPI
from ai_classificadora.serving.routes import router as main_router


def create_app() -> FastAPI:
    app = FastAPI(
        title="IA Classificadora Financeira",
        description=(
            "API REST para classificação automática de dados e "
            "documentos financeiros."
        ),
        version="1.0.0",
    )
    app.include_router(main_router)
    return app


app = create_app()
