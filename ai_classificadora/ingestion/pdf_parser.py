import os
import fitz  # PyMuPDF
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class PDFParser:
    """
    Classe responsável por extrair texto e dados estruturados de arquivos PDF.
    Exemplo de uso:
        parser = PDFParser()
        texto = parser.extract_text('caminho/arquivo.pdf')
    """

    def extract_text(self, file_path: str) -> str:
        if not os.path.exists(file_path):
            logger.error(f"Arquivo não encontrado: {file_path}")
            raise FileNotFoundError(f"Arquivo não encontrado: {file_path}")

        logger.info(f"Lendo o arquivo PDF: {file_path}")
        text = ""

        with fitz.open(file_path) as pdf:
            for page_num, page in enumerate(pdf, start=1):
                text += page.get_text()
                logger.debug(f"Texto extraído da página {page_num}")

        return text
