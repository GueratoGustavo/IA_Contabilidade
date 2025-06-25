from pydantic import BaseModel, Field
from typing import Dict


class PredictRequest(BaseModel):
    features: Dict[str, float] = Field(
        ..., description="Dicionário com dados de entrada para o modelo."
    )


class PredictResponse(BaseModel):
    prediction: str
