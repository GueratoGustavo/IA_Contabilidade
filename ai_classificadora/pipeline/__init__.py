"""
Pipeline de dados da IA Classificadora.

Este módulo contém componentes para:
- Pré-processamento e limpeza de dados
- Geração de novas features
- Validação de qualidade dos dados
"""

from .preprocessing import DataPreprocessor
from .feature_engineering import FeatureEngineer
from .data_validator import DataValidator

__all__ = ["DataPreprocessor", "FeatureEngineer", "DataValidator"]
