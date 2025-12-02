from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import analytics

app = FastAPI(title="Analytical Dashboard API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analytics.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Analytical Dashboard API!"}
