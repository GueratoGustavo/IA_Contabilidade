import pandas as pd
import logging

logger = logging.getLogger(__name__)


class DataPreprocessor:
    """
    Classe para limpeza e transformação básica de dados brutos.
    """

    def clean_nulls(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info(
            "Removendo colunas ou linhas com valores nulos excessivos..."
        )
        df_cleaned = df.dropna(thresh=int(0.5 * len(df.columns)))
        df_cleaned = df_cleaned.dropna(
            axis=1, thresh=int(0.5 * len(df_cleaned))
        )
        return df_cleaned

    def normalize_strings(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Normalizando strings: stripping e lowercase.")
        for col in df.select_dtypes(include="object").columns:
            df[col] = df[col].astype(str).str.strip().str.lower()
        return df

    def convert_types(self, df: pd.DataFrame, type_map: dict) -> pd.DataFrame:
        logger.info("Convertendo tipos de colunas conforme o mapa informado.")
        for col, dtype in type_map.items():
            if col in df.columns:
                try:
                    df[col] = df[col].astype(dtype)
                except Exception as e:
                    logger.warning(
                        f"Não foi possível converter '{col}' para {dtype}: {e}"
                    )
        return df
