from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import auth, predict, user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(predict.router)
app.include_router(user.router)


@app.get("/")
def home():
    return {"message": "API running clean 🚀"}