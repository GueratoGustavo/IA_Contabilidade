import os
from functools import lru_cache
from ai_classificadora.models.model_manager import ModelManager


@lru_cache()
def get_model():
    model_path = os.getenv(
        "MODEL_PATH", "ai_classificadora/models/saved/modelo.joblib"
    )
    manager = ModelManager()
    return manager.load_model(model_path)
