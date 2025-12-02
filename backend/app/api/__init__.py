# backend/app/api/__init__.py

from fastapi import APIRouter

router = APIRouter()

from .endpoints import data  # Importing the data endpoints

router.include_router(data.router, prefix="/data", tags=["data"])