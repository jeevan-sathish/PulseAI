from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
print("DB URL:", DATABASE_URL)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

if __name__ == "__main__":
    from db_models import User, Prediction

    db = SessionLocal()

    try:
        print("✅ Connected to database!")

        # 🔹 Insert dummy user
        user = User(
            name="TestUser",
            email="testuser@gmail.com",
            password="1234"
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        print("✅ User inserted with ID:", user.id)

        # 🔹 Insert dummy prediction
        pred = Prediction(
            prediction=1,
            user_id=user.id
        )

        db.add(pred)
        db.commit()

        print("✅ Prediction inserted!")

    except Exception as e:
        print("❌ Error:", e)

    finally:
        db.close()