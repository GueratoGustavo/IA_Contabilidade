from setuptools import find_packages, setup

setup(
    name="ai_classificadora",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "pandas",
        "scikit-learn",
        "fastapi",
        "uvicorn",
        "pdfminer.six",
        "pydantic",
        "joblib",
        "python-dotenv",
        "loguru",
    ],
    author="Seu Nome ou Empresa",
    author_email="seuemail@dominio.com",
    description=(
        "Módulo de IA Classificadora para automação financeira e contábil."
    ),
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/seuusuario/ai_classificadora",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Topic :: Software Development :: Build Tools",
    ],
    python_requires=">=3.9",
    include_package_data=True,
)
