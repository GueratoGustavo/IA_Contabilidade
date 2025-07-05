# Agente Financeiro Contábil – Backend Mês 1

## 📄 Descrição do Projeto

Este backend é a base do MVP para o Mês 1 do Agente Financeiro Contábil, cujo objetivo principal é estabelecer uma infraestrutura robusta para ingestão, classificação e auditoria de documentos financeiros, usando IA, filas assíncronas e blockchain.

### Funcionalidades principais:

- Upload de documentos (PDF, XML, CSV, etc) via API REST
- Processamento assíncrono com filas (BullMQ + Redis)
- Integração com microserviço Python que executa o modelo de IA classificadora
- Armazenamento dos resultados e documentos em banco NoSQL (MongoDB)
- Feedback em tempo real ao cliente via WebSocket (Socket.IO)
- Auditoria de integridade dos documentos via blockchain customizada
- Infraestrutura conteinerizada (Docker) para desenvolvimento e deploy

---

## 🚀 Tecnologias Utilizadas

| Tecnologia           | Finalidade                                  |
|---------------------|---------------------------------------------|
| Node.js + Express   | Servidor e API REST                         |
| BullMQ + Redis      | Gerenciamento de fila para processamento   |
| MongoDB             | Banco de dados para documentos e resultados|
| Socket.IO           | Comunicação em tempo real (WebSocket)      |
| Docker + Docker Compose | Containerização e orquestração           |
| Python + FastAPI    | Microserviço IA classificadora              |
| SHA256 / Blockchain | Auditoria e rastreabilidade dos documentos  |

---

## 🏗 Arquitetura do Sistema

```mermaid
graph LR
  Client[Cliente Frontend]
  API[API Node.js/Express]
  Queue[BullMQ (Redis)]
  Worker[Worker Node.js]
  PythonSvc[Microserviço Python IA]
  Mongo[MongoDB]
  WS[Socket.IO]
  Blockchain[Blockchain Auditoria]

  Client -->|POST /upload| API
  API --> Queue
  Queue --> Worker
  Worker --> PythonSvc
  PythonSvc --> Worker
  Worker --> Mongo
  Worker --> Blockchain
  Worker --> WS
  WS --> Client
