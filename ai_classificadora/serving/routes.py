from fastapi import APIRouter, Depends, HTTPException
from ai_classificadora.serving.schemas import PredictRequest, PredictResponse
from ai_classificadora.serving.services import make_prediction
from ai_classificadora.serving.dependencies import get_model

router = APIRouter()


@router.get("/")
def health_check():
    return {
        "status": "OK",
        "message": "API da IA Classificadora está funcionando."
    }


@router.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest, model=Depends(get_model)):
    try:
        prediction = make_prediction(model, request)
        return PredictResponse(prediction=prediction)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
