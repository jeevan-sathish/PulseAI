from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

# Load model files
model = joblib.load("./models/model.pkl")
scaler = joblib.load("./models/scaler.pkl")
columns = joblib.load("./models/columns.pkl")

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for testing
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
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


@app.get("/")
def home():
    return {"message": "API is running"}


@app.post("/predict")
def predict(data: InputData):
    

    # Convert input to dataframe
    df = pd.DataFrame([data.dict()])

    # Encoding
    df = pd.get_dummies(df)

    # Match training columns
    df = df.reindex(columns=columns, fill_value=0)

    # Convert bool → int
    df = df.astype(int)

    # Scale
    df = scaler.transform(df)

    # Predict
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return {
        "prediction": int(prediction),
        "probability": float(probability)
    }