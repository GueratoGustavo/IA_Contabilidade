FROM python:3.10-slim-bullseye

ENV TZ=America/Sao_Paulo
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpoppler-cpp-dev \
    pkg-config \
    python3-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

ARG ENV=production
ENV ENV=${ENV}

CMD ["uvicorn", "ai_classificadora.serving.main:app", "--host", "0.0.0.0", "--port", "8000"]
