import logging
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pandas as pd
from models.model_manager import ModelManager
from pipeline import prepare_data
from utils import setup_logging
import os

setup_logging()
logger = logging.getLogger(__name__)


def train(data_path: str, target_col: str = "target"):
    logger.info(f"Carregando dados de {data_path}")
    df = pd.read_csv(data_path)

    X_train, X_test, y_train, y_test = prepare_data(df, target_col)

    logger.info("Iniciando treinamento do modelo Random Forest")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    acc = accuracy_score(y_test, preds)
    logger.info(f"Acurácia obtida: {acc*100:.2f}%")

    model_manager = ModelManager()
    model_manager.save_model(model)
    logger.info(f"Modelo salvo em {model_manager.model_path}")

    return model, acc


if __name__ == "__main__":
    dataset_path = os.path.join(
        os.path.dirname(__file__), "../data/processed/dataset.csv"
    )
    train(dataset_path)
