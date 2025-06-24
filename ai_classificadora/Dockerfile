FROM python:3.10-slim-bullseye

ENV TZ=America/Sao_Paulo

RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    libpoppler-cpp-dev \
    pkg-config \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "serving.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
