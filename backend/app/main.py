from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.secrets import router as secret_router

app = FastAPI(
    title="SecretShare"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    secret_router,
    prefix="/api"
)