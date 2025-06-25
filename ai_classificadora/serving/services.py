import pandas as pd
from ai_classificadora.serving.schemas import PredictRequest


def make_prediction(model, request: PredictRequest) -> str:
    df = pd.DataFrame([request.features])
    prediction = model.predict(df)[0]
    return str(prediction)
