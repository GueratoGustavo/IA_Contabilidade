import logging
from datetime import datetime
from typing import Optional

logger = logging.getLogger("ai_classificadora.monitoring")


class MetricsLogger:
    """
    Classe responsável por registrar métricas de uso da API.
    Pode ser estendida para integração com Prometheus, DataDog ou
    sistemas de log estruturado.
    estruturado.
    """

    def log_prediction(
        self,
        model_name: str,
        input_size: int,
        prediction: str,
        duration_ms: float,
        user_id: Optional[str] = None,
    ):
        """
        Registra uma predição realizada com suas métricas básicas.

        Args:
            model_name (str): Nome ou versão do modelo utilizado.
            input_size (int): Número de features recebidas.
            prediction (str): Resultado da predição.
            duration_ms (float): Tempo total da predição em milissegundos.
            user_id (Optional[str]): Identificador do usuário, se aplicável.
        """
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "model": model_name,
            "input_size": input_size,
            "prediction": prediction,
            "duration_ms": duration_ms,
            "user_id": user_id,
        }

        logger.info(f"[METRICS] {log_entry}")
