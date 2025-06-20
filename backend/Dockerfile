FROM node:20-alpine3.18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

FROM node:20-alpine3.18
WORKDIR /usr/src/app
RUN apk update && apk upgrade && apk add --no-cache tini
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]
