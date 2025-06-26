import pandas as pd
import random
from faker import Faker
from datetime import timedelta
import os
import uuid

fake = Faker("pt_BR")
random.seed(42)

# --- Parâmetros
n_samples = 200_000

moedas = ["BRL", "USD", "EUR"]
tipos_documento = ["NF-e", "NFS-e", "Recibo", "Fatura", "Boleto"]
classificacoes = ["Entrada", "Saída", "Reembolso", "Pagamento", "Recebimento"]
categorias = [
    "Serviço",
    "Produto",
    "Folha de Pagamento",
    "Investimento",
    "Tributo",
    "Outros",
]
status_list = ["Processado", "Pendente", "Cancelado", "Erro", "Aprovado"]
formas_pagamento = ["Dinheiro", "Cartão", "Transferência", "PIX", "Boleto"]
tipos_emissor = ["Pessoa Jurídica", "Pessoa Física"]
natureszas = [
    "Venda",
    "Compra",
    "Prestação de Serviço",
    "Importação",
    "Exportação",
]
cfops = ["5102", "6108", "1403", "1201", "3201"]
ncms = ["8471.80.00", "3004.90.99", "2710.12.59", "2203.00.00", "9018.39.99"]


# --- Funções auxiliares
def gerar_cnpj():
    raiz = random.randint(10000000, 99999999)
    filial = random.randint(1, 999)
    dv = random.randint(10, 99)
    return (
        f"{raiz:08d}{filial:03d}{dv:02d}",
        f"{raiz:08d}",
        f"{filial:03d}",
        f"{dv:02d}",
    )


def gerar_documento(i):
    data_emissao = fake.date_between(start_date="-1y", end_date="today")
    data_vencimento = data_emissao + timedelta(days=random.randint(0, 90))

    cnpj_emissor, raiz, filial, dv = gerar_cnpj()
    cpf_responsavel = fake.cpf()
    valor = round(random.uniform(100, 50000), 2)

    return {
        "id": str(uuid.uuid4()),
        "data_emissao": data_emissao,
        "data_vencimento": data_vencimento,
        "nome_emissor": fake.company(),
        "cnpj_emissor": cnpj_emissor,
        "raiz_cnpj": raiz,
        "filial_cnpj": filial,
        "dv_cnpj": dv,
        "cpf_responsavel": cpf_responsavel,
        "numero_documento": f"{random.randint(100000, 999999)}",
        "valor_total": valor,
        "moeda": random.choice(moedas),
        "tipo_documento": random.choice(tipos_documento),
        "classificacao": random.choice(classificacoes),
        "categoria": random.choice(categorias),
        "status": random.choice(status_list),
        "descricao": fake.sentence(nb_words=6),
        "observacao": fake.text(max_nb_chars=30),
        "numero_paginas": random.randint(1, 12),
        "confianca_esperada": round(random.uniform(0.80, 0.999), 3),
        "natureza_operacao": random.choice(natureszas),
        "forma_pagamento": random.choice(formas_pagamento),
        "tipo_emissor": random.choice(tipos_emissor),
        "cfop": random.choice(cfops),
        "ncm": random.choice(ncms),
    }


# --- Geração de DataFrame
dados = [gerar_documento(i) for i in range(n_samples)]
df = pd.DataFrame(dados)

# --- Salvar CSV
os.makedirs("data/raw", exist_ok=True)
caminho_csv = "data/raw/documentos_sinteticos.csv"
df.to_csv(caminho_csv, index=False, encoding="utf-8")

print(f"✅ CSV gerado com {n_samples} linhas em: {caminho_csv}")
