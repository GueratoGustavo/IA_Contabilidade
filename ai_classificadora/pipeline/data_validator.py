import pandas as pd
import logging

logger = logging.getLogger(__name__)


class DataValidator:
    """
    Classe para validação de integridade e qualidade dos dados.
    """

    def check_required_columns(self, df: pd.DataFrame, required: list) -> bool:
        missing = [col for col in required if col not in df.columns]
        if missing:
            logger.error(f"Colunas obrigatórias ausentes: {missing}")
            return False
        logger.info("Todas as colunas obrigatórias estão presentes.")
        return True

    def check_duplicates(self, df: pd.DataFrame) -> bool:
        duplicated = df.duplicated().sum()
        if duplicated > 0:
            logger.warning(
                f"Foram encontradas {duplicated} linhas duplicadas."
            )
            return False
        logger.info("Nenhuma duplicata encontrada.")
        return True

    def check_value_ranges(
        self, df: pd.DataFrame, column_ranges: dict
    ) -> bool:
        all_ok = True
        for col, (min_val, max_val) in column_ranges.items():
            if col in df.columns:
                outliers = df[(df[col] < min_val) | (df[col] > max_val)]
                if not outliers.empty:
                    logger.warning(
                        f"Valores fora do intervalo em '{col}': "
                        f"{len(outliers)} registros."
                    )
                    all_ok = False
        return all_ok
