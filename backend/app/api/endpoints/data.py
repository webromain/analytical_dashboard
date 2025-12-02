from fastapi import APIRouter
from typing import List, Dict
import pandas as pd
from backend.app.services.data_processing import load_csv, calculate_statistics

router = APIRouter()

@router.get("/summary", response_model=Dict[str, float])
async def get_summary(file_path: str) -> Dict[str, float]:
    data = load_csv(file_path)
    stats = calculate_statistics(data)
    return stats

@router.get("/histogram", response_model=List[Dict[str, float]])
async def get_histogram(file_path: str, column: str) -> List[Dict[str, float]]:
    data = load_csv(file_path)
    histogram_data = data[column].value_counts().to_dict()
    return [{"value": k, "count": v} for k, v in histogram_data.items()]