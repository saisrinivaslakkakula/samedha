import os
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import memories

app = FastAPI(title="Second Brain API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(memories.router, prefix="/api/v1")


@app.get("/health")
def health():
    return {"status": "ok"}
