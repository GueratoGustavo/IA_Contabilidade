# 🧠 Agente Financeiro Contábil – Frontend

> Interface do MVP completo do Agente Contábil com IAs Oceano Azul  
> Classificação de documentos com IA · Gamificação · Blockchain · Feedback em tempo real

---

## 🚀 Visão Geral

Este é o frontend da plataforma Agente Financeiro Contábil com IA, focada em automação contábil, classificação inteligente de documentos e rastreabilidade via blockchain.

O MVP foi construído com foco em modularidade, responsividade e escalabilidade, e inclui:

- Upload e classificação automática de documentos
- Gamificação com sistema de pontos, badges e feedback em tempo real
- Verificação de integridade via Blockchain
- Comunicação com modelos de IA em Python
- Integração via APIs com backend Node.js

---

## 🧱 Tecnologias Utilizadas

- ⚛️ [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- 🎨 [TailwindCSS](https://tailwindcss.com/)
- 💎 [ShadCN/UI](https://ui.shadcn.com/)
- 🧠 [Framer Motion](https://www.framer.com/motion/)
- 🌐 [Axios](https://axios-http.com/)
- 🗂️ Context API (estado global de gamificação)
- 🍞 [React Hot Toast](https://react-hot-toast.com/)
- 🔒 React Router DOM

---

## 📁 Estrutura de Pastas

```
src/
├── assets/              # Logos, ícones e imagens
├── components/          # Componentes reutilizáveis (UploadForm, RewardsModal, etc)
├── contexts/            # Estado global (gamificação, auth, IA)
├── pages/               # Páginas principais (Home, Dashboard, Demo, etc)
├── services/            # Integrações com APIs (documentService, auditService)
├── routes/              # Sistema de rotas
├── App.tsx              # Componente raiz da aplicação
├── main.tsx             # Entry point
└── index.css            # Estilos globais com Tailwind
```

---

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/agente-contabil-frontend.git
cd agente-contabil-frontend

# Instale as dependências
pnpm install
```

### Execução

```bash
pnpm dev
```

A aplicação estará disponível em: `http://localhost:5173`

---

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## ✅ Funcionalidades MVP Mês 1

| Módulo                 | Descrição                                                                 |
|------------------------|---------------------------------------------------------------------------|
| 📤 UploadForm           | Upload de documentos (.pdf, .jpg, .png)                                   |
| 🧠 IA Classificadora    | Requisições à IA Python para classificação                                |
| 🏆 Gamificação          | Pontuação e badges por ação do usuário                                   |
| 🔴 Feedback em Tempo    | Modal com feedback imediato após upload                                  |
| 🔗 Auditoria Blockchain | Exibe status de verificação de integridade do documento via API /audit   |

---

## 🧪 Testes

Em breve: testes com Vitest e Cypress

---

## 🛠️ Próximas Etapas

- Integração com módulos do Mês 2 (Compliance, Validação NF-e)
- Dashboards interativos do Mês 3
- Chatbot contábil com IA no Mês 6

---

## 🤝 Contribuindo

Pull requests são bem-vindos! Para mudanças maiores, por favor abra uma issue antes para discutir o que você gostaria de alterar.

---

## 📄 Licença

MIT

---

## 🧠 Sobre o Projeto

Este projeto é parte do roadmap completo do **Agente Financeiro Contábil com IAs Oceano Azul**, que busca transformar a contabilidade empresarial com automação inteligente, rastreabilidade e análise de dados em larga escala.
