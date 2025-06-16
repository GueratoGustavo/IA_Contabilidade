FROM nginx:1.25-alpine

# Remove a conf padrão e adiciona a custom
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/

# Expõe a porta padrão
EXPOSE 80
