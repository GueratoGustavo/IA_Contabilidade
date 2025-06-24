import os
import joblib
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class ModelManager:
    """
    Gerencia o salvamento, carregamento e versionamento de modelos.
    """

    def __init__(self, model_dir="ai_classificadora/models/saved"):
        os.makedirs(model_dir, exist_ok=True)
        self.model_dir = model_dir

    def save_model(
        self, model, name: str = "modelo", versioned: bool = True
    ) -> str:
        filename = f"{name}.joblib"
        if versioned:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{name}_{timestamp}.joblib"
        path = os.path.join(self.model_dir, filename)
        joblib.dump(model, path)
        logger.info(f"Modelo salvo em: {path}")
        return path

    def load_model(self, path: str):
        if not os.path.exists(path):
            logger.error(f"Modelo não encontrado: {path}")
            raise FileNotFoundError(f"Modelo não encontrado: {path}")
        logger.info(f"Carregando modelo de: {path}")
        return joblib.load(path)
