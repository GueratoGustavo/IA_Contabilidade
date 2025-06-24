import logging
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)

logger = logging.getLogger(__name__)


def evaluate_model(model, X_test, y_test, verbose=True):
    """
    Avalia o modelo e retorna as métricas principais.
    """

    logger.info("Iniciando avaliação do modelo...")
    y_pred = model.predict(X_test)

    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "report": classification_report(y_test, y_pred, output_dict=True),
        "confusion_matrix": confusion_matrix(y_test, y_pred).tolist(),
    }

    if verbose:
        logger.info(f"Acurácia: {metrics['accuracy']:.4f}")
        logger.info("Relatório de Classificação:")
        logger.info(classification_report(y_test, y_pred))
        logger.info("Matriz de Confusão:")
        logger.info(metrics["confusion_matrix"])

    return metrics
