import sys
import os

def classify(file_path):
    # Mock simples: classifica baseado no nome do arquivo
    filename = os.path.basename(file_path).lower()
    if "boleto" in filename:
        return "Boleto Bancário"
    elif "nota" in filename:
        return "Nota Fiscal"
    else:
        return "Outro Documento"

if __name__ == "__main__":
    file_path = sys.argv[1]
    result = classify(file_path)
    print(result)
