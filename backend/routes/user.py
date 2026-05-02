from fastapi import APIRouter
from database import SessionLocal
from db_models import User, Prediction

router = APIRouter()


@router.get("/user/{user_id}")
def get_user(user_id: int):
    db = SessionLocal()

    user = db.query(User).filter(User.id == user_id).first()

    db.close()

    if not user:
        return {"error": "User not found"}

    return {
        "name": user.name,
        "email": user.email
    }


@router.get("/history/{user_id}")
def get_history(user_id: int):
    db = SessionLocal()

    records = db.query(Prediction).filter(Prediction.user_id == user_id).all()

    db.close()

    return [
        {
            "id": r.id,
            "prediction": r.prediction
        }
        for r in records
    ]