FROM python:3.11.9-slim-bullseye

# Atualiza e instala ferramentas base
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    curl \
    git \
    build-essential \
    && apt-get clean

# Define diretório base para projetos que herdam dessa imagem
WORKDIR /base

# Mantém compatível com containers derivados
CMD ["bash"]
