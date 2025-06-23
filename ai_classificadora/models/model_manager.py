import joblib
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from typing import Optional

MODEL_PATH = Path(__file__).parent / "model_rf_v1.joblib"


class ModelManager:
    def __init__(self, model_path: Optional[Path] = None):
        self.model_path = model_path or MODEL_PATH
        self.model: Optional[RandomForestClassifier] = None

    def load_model(self) -> RandomForestClassifier:
        if self.model is None:
            self.model = joblib.load(self.model_path)
        return self.model

    def save_model(self, model: RandomForestClassifier):
        joblib.dump(model, self.model_path)
        self.model = model
