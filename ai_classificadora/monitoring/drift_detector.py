import pandas as pd
from scipy.stats import ks_2samp
from typing import Dict, Tuple


class DriftDetector:
    """
    Detector simples de drift de dados baseado em estatísticas univariadas.
    Pode ser estendido com métodos multivariados ou modelos de confiança.
    """

    def __init__(self, baseline_data: pd.DataFrame):
        """
        Inicializa com dados de referência (baseline), geralmente coletados
        no treino.
        """
        self.baseline = baseline_data

    def detect_drift(
        self, current_data: pd.DataFrame, threshold: float = 0.05
    ) -> Dict[str, bool]:
        """
        Verifica se houve drift estatisticamente significante por feature.

        Args:
            current_data (pd.DataFrame): Dados atuais recebidos pela API.
            threshold (float): Valor-p limite para detecção de drift
                (default = 0.05).

        Returns:
            Dict[str, bool]: Mapa de features e se houve ou não drift.
        """
        results = {}
        for column in self.baseline.columns:
            if column not in current_data.columns:
                continue

            baseline_values = self.baseline[column].dropna()
            current_values = current_data[column].dropna()

            if len(baseline_values) < 10 or len(current_values) < 10:
                results[column] = False
                continue

            _, p_value = ks_2samp(baseline_values, current_values)
            results[column] = p_value < threshold

        return results

    def summarize_drift(
        self, drift_results: Dict[str, bool]
    ) -> Tuple[int, int]:
        """
        Resume o número total de features com drift detectado.

        Returns:
            Tuple[int, int]: (total analisado, total com drift)
        """
        total = len(drift_results)
        com_drift = sum(drift_results.values())
        return total, com_drift
