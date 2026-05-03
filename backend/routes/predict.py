from fastapi import APIRouter
import pandas as pd
import joblib
from database import SessionLocal
from db_models import Prediction
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from groq import Groq

load_dotenv
router = APIRouter()


model = joblib.load("./models/model.pkl")
scaler = joblib.load("./models/scaler.pkl")
columns = joblib.load("./models/columns.pkl")


class InputData(BaseModel):
    Age: int
    Sex: str
    ChestPainType: str
    RestingBP: int
    Cholesterol: int
    FastingBS: int
    RestingECG: str
    MaxHR: int
    ExerciseAngina: str
    Oldpeak: float
    ST_Slope: str


@router.post("/predict")
def predict(data: InputData, user_id: int):
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": f"Based on the following patient data, provide health suggestions: {data.dict()}"}
        ]
    )
    result = response.choices[0].message.content
   

    # ML processing
    df = pd.DataFrame([data.dict()])
    df = pd.get_dummies(df)
    df = df.reindex(columns=columns, fill_value=0)
    df = scaler.transform(df)

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    # 🔥 SAVE TO DATABASE HERE
    db = SessionLocal()

    new_pred = Prediction(
        prediction=int(prediction),
        user_id=user_id
    )

    db.add(new_pred)
    db.commit()
    db.close()

    return {
        "prediction": int(prediction),
        "probability": float(probability),
        "suggestions": result
    }