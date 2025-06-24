"""
Módulo de Gerenciamento de Modelos.

Contém:
- Salvamento e carregamento de modelos
- Treinamento com algoritmo configurável
- Avaliação de performance
"""

from .model_manager import ModelManager
from .train_model import train_model
from .evaluate_model import evaluate_model

__all__ = ["ModelManager", "train_model", "evaluate_model"]
