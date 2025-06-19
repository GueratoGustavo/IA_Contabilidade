FROM python:3.10-slim

WORKDIR /app

RUN pip install --no-cache-dir mlflow[extras] boto3 sqlalchemy psycopg2-binary

# Se você usar backend store e artifact store com S3, Postgres, etc., ajuste conforme necessidade

EXPOSE 5000

CMD ["mlflow", "server", 
     "--host", "0.0.0.0", 
     "--port", "5000", 
     "--backend-store-uri", "sqlite:///mlflow.db", 
     "--default-artifact-root", "./artifacts"]
