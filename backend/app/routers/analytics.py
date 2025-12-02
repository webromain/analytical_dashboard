from __future__ import annotations
from typing import Optional, Dict, Any

from fastapi import APIRouter, Query
import pandas as pd

from ..services.data_processing import (
    load_csv,
    calculate_summary_statistics,
    generate_histogram_data,
)
from ..models.schema import SummaryResponse, HistogramResponse

router = APIRouter(tags=["analytics"])  # root-level paths: /summary, /histogram


@router.get("/summary", response_model=SummaryResponse)
def get_summary(file_path: Optional[str] = Query(default=None)) -> Dict[str, Any]:
    if file_path:
        data = load_csv(file_path)
    else:
        data = pd.DataFrame({"value": [1, 2, 3, 4, 5]})
    stats = calculate_summary_statistics(data)
    return stats


@router.get("/histogram", response_model=HistogramResponse)
def get_histogram(
    file_path: Optional[str] = Query(default=None),
    column: Optional[str] = Query(default=None),
    bins: int = Query(default=10, ge=1, le=200)
) -> Dict[str, Any]:
    if file_path:
        data = load_csv(file_path)
    else:
        data = pd.DataFrame({"value": [1, 2, 2, 3, 3, 3, 4, 5]})

    col = column or (data.columns[0] if len(data.columns) > 0 else None)
    if col is None or col not in data.columns:
        return {"data": []}

    hist = generate_histogram_data(data, col, bins=bins)
    out = []
    for k, v in hist.items():
        out.append({"value": str(k), "count": float(v)})
    return {"data": out}
