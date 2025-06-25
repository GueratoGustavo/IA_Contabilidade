"""
Módulo de monitoramento da IA Classificadora.

Contém utilitários para registro de métricas e detecção de drift de dados
em produção.
"""

from .metrics_logger import MetricsLogger
from .drift_detector import DriftDetector

__all__ = ["MetricsLogger", "DriftDetector"]
