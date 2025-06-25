import pandas as pd
import logging
import hashlib
import os

# Configura logging
logging.basicConfig(
    format="[%(asctime)s] %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)


class DataPreprocessor:
    def clean_nulls(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Removendo colunas ou linhas com valores nulos excessivos...")
        df_cleaned = df.dropna(thresh=int(0.5 * len(df.columns)))
        threshold = int(0.5 * len(df_cleaned))
        df_cleaned = df_cleaned.dropna(axis=1, thresh=threshold)
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

    def hash_sensitive_data(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Aplicando hash irreversível em dados sensíveis para LGPD.")
        sensitive_cols = [
            "nome_emissor",
            "cnpj_emissor",
            "raiz_cnpj",
            "filial_cnpj",
            "dv_cnpj",
            "cpf_responsavel",
        ]
        for col in sensitive_cols:
            if col in df.columns:
                df[col] = df[col].apply(lambda x: self._hash_string(str(x)))
        return df

    def remove_or_mask_columns(self, df: pd.DataFrame) -> pd.DataFrame:
        logger.info("Removendo colunas não essenciais (ex: descrição, observação).")
        drop_cols = ["observacao", "descricao"]
        df = df.drop(
            columns=[col for col in drop_cols if col in df.columns], errors="ignore"
        )
        return df

    @staticmethod
    def _hash_string(value: str) -> str:
        return hashlib.sha256(value.encode("utf-8")).hexdigest()


if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    INPUT_PATH = os.path.join(BASE_DIR, "raw", "dataset.csv")
    OUTPUT_PATH = os.path.abspath(
        os.path.join(BASE_DIR, "../../processed/training_data.csv")
    )

    if not os.path.exists(INPUT_PATH):
        logger.error(f"Arquivo de entrada não encontrado: {INPUT_PATH}")
        exit(1)

    logger.info(f"Lendo dados de {INPUT_PATH}")
    df = pd.read_csv(INPUT_PATH)

    preprocessor = DataPreprocessor()
    df = preprocessor.clean_nulls(df)
    df = preprocessor.normalize_strings(df)
    df = preprocessor.convert_types(
        df, {"valor_total": "float", "numero_paginas": "int"}
    )
    df = preprocessor.hash_sensitive_data(df)
    df = preprocessor.remove_or_mask_columns(df)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    df.to_csv(OUTPUT_PATH, index=False)
    logger.info(f"Dados processados e salvos em {OUTPUT_PATH}")
