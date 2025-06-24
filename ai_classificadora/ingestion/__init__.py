"""
Módulo de Ingestão de Dados da IA Classificadora.

Este pacote contém funções para ingestão de dados de múltiplas fontes:
- Arquivos PDF
- Arquivos CSV
- Conexões com APIs externas
"""

from .pdf_parser import PDFParser
from .csv_parser import CSVParser
from .api_connector import APIConnector

__all__ = ["PDFParser", "CSVParser", "APIConnector"]
