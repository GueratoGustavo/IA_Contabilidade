
# IA_Classificadora (IA_Contabilidade)

API/Módulo em Python para **classificação automática de documentos e dados contábeis**, incluindo pipelines de ingestão, processamento, modelagem e serving.

---

## 📂 Estrutura do Projeto

```
ai_classificadora/
├── ingestion/       # Extração de dados (PDF, CSV, APIs)
├── pipeline/        # Limpeza, geração de features e validação
├── models/          # Treinamento, avaliação e gerenciamento de modelos
├── serving/         # API REST com FastAPI
├── monitoring/      # (a implementar) Métricas, logs e alertas
├── tests/           # (a implementar) Testes unitários e integração
├── configs/         # (a implementar) Configurações do projeto
├── scripts/         # Utilitários e automações
├── notebooks/       # Notebooks para análise exploratória
├── Dockerfile
├── docker-compose.yaml
├── requirements.txt
├── setup.py
└── README.md
```

---

## 🚀 Funcionalidades

- **Ingestão**: parser de PDFs (`pdf_parser.py`), CSVs (`csv_parser.py`) e conectores para APIs (`api_connector.py`).
- **Pipeline**: limpeza de dados, normalização, engenharia de features e validações automatizadas.
- **Modelagem**: treinamento (`train_model.py`), avaliação (`evaluate_model.py`) e gerenciamento de um modelo (salvar, carregar com versionamento).
- **Serving**: API REST escalável com FastAPI organizada por rotas, schemas, serviços e injeção de dependências.
- **Pronto para produção**: modularização, tipos, logs, validações e fácil integração com Docker e CI/CD.

---

## 🧭 Começando

### 1. Clone o repositório:

```bash
git clone https://github.com/GueratoGustavo/IA_Contabilidade.git
cd IA_Contabilidade
```

### 2. Configure o ambiente (recomendado via `venv`):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Treine um modelo básico:

```python
from ai_classificadora.pipeline.preprocessing import DataPreprocessor
from ai_classificadora.pipeline.feature_engineering import FeatureEngineer
from ai_classificadora.pipeline.data_validator import DataValidator
from ai_classificadora.models.train_model import train_model
from ai_classificadora.models.model_manager import ModelManager

# Exemplo fictício:
# df = load seus dados...
# X, y = extrair features e target...
model, (X_test, y_test) = train_model(X, y)
ModelManager().save_model(model, name="modelo_contabil", versioned=True)
```

### 4. Rode a API:

```bash
export MODEL_PATH=ai_classificadora/models/saved/modelo_contabil_<timestamp>.joblib
uvicorn ai_classificadora.serving.app:app --reload
```

---

## ✔️ Endpoints disponíveis

- `GET /`: Check de saúde da API.
- `POST /predict`: Envia JSON com dicionário `features`, recebe retorno:

```json
{
  "features": {
    "faturamento": 10000.0,
    "tempo_empresa": 24.0,
    "score_credito": 700.0
  }
}
```

Exemplo de resposta:

```json
{
  "prediction": "classe_alta"
}
```

---

## 📈 Roadmap

- ✅ Monitoramento (Prometheus, logs)
- ✅ Testes automatizados (`pytest`, `httpx`)
- ✅ Autenticação (API Key ou JWT)
- ✅ Múltiplos modelos/versionamento via rotas
- ✅ Docker Compose completo
- ✅ Integração com MLflow / DVC

---

## 👨‍💻 Como contribuir

1. Fork este repositório
2. Crie uma feature branch (`git checkout -b feature/minha-feature`)
3. Faça commits atômicos e `rebase`
4. Abra um Pull Request com descrição clara do objetivo

---

## 🔖 Licença

Este projeto é distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.
