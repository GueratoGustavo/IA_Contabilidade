FROM node:20-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

FROM node:20-slim

WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y tini openssl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copia arquivos do builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Copia o entrypoint script e torna executável
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Se você quer copiar o .env, certifique-se que ele esteja no contexto de build
# Mas em geral, o .env deve ser passado via docker-compose (env_file), então não é obrigatório
# COPY .env ./

EXPOSE 8000

ENTRYPOINT ["tini", "--", "./docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
