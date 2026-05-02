from fastapi import APIRouter
from pydantic import BaseModel
from database import SessionLocal
from db_models import Prediction, User

router = APIRouter()

class RegisterData(BaseModel):
    name: str
    email: str
    password: str

class LoginData(BaseModel):
    email: str
    password: str


@router.post("/register")
def register(data: RegisterData):
    db = SessionLocal()

    user = User(
        name=data.name,
        email=data.email,
        password=data.password
    )

    db.add(user)
    db.commit()
    db.close()

    return {"message": "User registered"}


@router.post("/login")
def login(data: LoginData):
    db = SessionLocal()

    user = db.query(User).filter(User.email == data.email).first()

    if not user or user.password != data.password:
        return {"error": "Invalid credentials"}

    return {
        "message": "Login successful",
        "user_id": user.id,
        "name": user.name
    }

@router.get("/history/{user_id}")
def get_history(user_id: int):
    db = SessionLocal()

    history = db.query(Prediction).filter(Prediction.user_id == user_id).all()

    return [
        {
            "id": h.id,
            "prediction": h.prediction
        }
        for h in history
    ]