import pandas as pd
import logging

logger = logging.getLogger(__name__)


class FeatureEngineer:
    """
    Classe para criação de features adicionais derivadas dos dados brutos.
    """

    def add_date_parts(self, df: pd.DataFrame, date_col: str) -> pd.DataFrame:
        logger.info(f"Extraindo partes da data da coluna '{date_col}'")
        if date_col in df.columns:
            df[date_col] = pd.to_datetime(df[date_col], errors="coerce")
            df["year"] = df[date_col].dt.year
            df["month"] = df[date_col].dt.month
            df["day"] = df[date_col].dt.day
        return df

    def create_ratios(
        self, df: pd.DataFrame, numerators: list, denominators: list
    ) -> pd.DataFrame:
        logger.info("Criando razões entre colunas numéricas.")
        for num in numerators:
            for denom in denominators:
                if num in df.columns and denom in df.columns and denom != num:
                    col_name = f"{num}_per_{denom}"
                    df[col_name] = df[num] / (df[denom] + 1e-5)
        return df
