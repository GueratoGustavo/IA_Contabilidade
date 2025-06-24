import requests
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class APIConnector:
    """
    Classe para integração com APIs externas (exemplo: ERP, 
    Serviços de terceiros).
    Exemplo de uso:
        connector = APIConnector(base_url="https://api.exemplo.com")
        resposta = connector.get("/dados")
    """

    def __init__(self, base_url: str, headers: dict = None):
        self.base_url = base_url
        self.headers = headers or {"Content-Type": "application/json"}

    def get(self, endpoint: str, params: dict = None):
        url = f"{self.base_url}{endpoint}"
        logger.info(f"Realizando GET em: {url}")
        response = requests.get(url, headers=self.headers, params=params)
        response.raise_for_status()
        return response.json()

    def post(self, endpoint: str, data: dict):
        url = f"{self.base_url}{endpoint}"
        logger.info(f"Realizando POST em: {url} com payload: {data}")
        response = requests.post(url, headers=self.headers, json=data)
        response.raise_for_status()
        return response.json()
