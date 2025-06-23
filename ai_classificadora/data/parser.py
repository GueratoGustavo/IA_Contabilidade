import pandas as pd
import pdfplumber
import logging

logger = logging.getLogger(__name__)


def parse_csv(path: str) -> pd.DataFrame:
    logger.info(f"Lendo CSV de {path}")
    return pd.read_csv(path)


def parse_pdf(path: str) -> pd.DataFrame:
    logger.info(f"Extraindo texto de PDF {path}")
    with pdfplumber.open(path) as pdf:
        pages_text = [page.extract_text() for page in pdf.pages]
    # TODO: implementar extração estruturada.
    # Aqui retorna texto bruto por página.
    df = pd.DataFrame({"page_text": pages_text})
    return df


def parse_file(path: str) -> pd.DataFrame:
    if path.lower().endswith(".csv"):
        return parse_csv(path)
    elif path.lower().endswith(".pdf"):
        return parse_pdf(path)
    else:
        raise ValueError(f"Formato não suportado: {path}")
