FROM python:3.11.9-slim-bullseye

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get install -y build-essential

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "main.py"]
