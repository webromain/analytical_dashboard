from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import data

app = FastAPI()

# Middleware to allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API router
app.include_router(data.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Analytical Dashboard API!"}