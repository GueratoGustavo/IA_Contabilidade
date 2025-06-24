import os
import pandas as pd
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CSVParser:
    """
    Classe para validação e parsing de arquivos CSV.
    Exemplo de uso:
        parser = CSVParser()
        df = parser.load_csv('caminho/arquivo.csv')
    """

    def load_csv(self, file_path: str) -> pd.DataFrame:
        if not os.path.exists(file_path):
            logger.error(f"Arquivo CSV não encontrado: {file_path}")
            raise FileNotFoundError(f"Arquivo CSV não encontrado: {file_path}")

        try:
            df = pd.read_csv(file_path)
            logger.info(f"Arquivo CSV carregado com sucesso: {file_path}")
            return df
        except Exception as e:
            logger.exception(f"Erro ao ler o arquivo CSV: {file_path}")
            raise e

    def validate_columns(
        self, df: pd.DataFrame, required_columns: list
    ) -> bool:
        missing_columns = [
            col for col in required_columns if col not in df.columns
        ]
        if missing_columns:
            logger.warning(f"Colunas ausentes no CSV: {missing_columns}")
            return False
        logger.info("Todas as colunas obrigatórias estão presentes.")
        return True
