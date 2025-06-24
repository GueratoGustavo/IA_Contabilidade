import logging
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

logger = logging.getLogger(__name__)


def train_model(
    X, y, model_type="random_forest", test_size=0.2, random_state=42
):
    """
    Treina e retorna um modelo sklearn. Divide os dados automaticamente.
    """

    logger.info(f"Iniciando treinamento: {model_type}")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )

    if model_type == "random_forest":
        model = RandomForestClassifier(
            n_estimators=100, random_state=random_state
        )
    elif model_type == "logistic_regression":
        model = LogisticRegression(max_iter=1000)
    else:
        raise ValueError(f"Modelo não suportado: {model_type}")

    model.fit(X_train, y_train)
    logger.info("Treinamento concluído com sucesso.")
    return model, (X_test, y_test)
