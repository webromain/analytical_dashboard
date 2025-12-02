from __future__ import annotations
from typing import Optional, Dict, Any

from fastapi import APIRouter, Query, UploadFile, File
import pandas as pd

from ..services.data_processing import (
    load_csv,
    calculate_summary_statistics,
    generate_histogram_data,
    infer_column_types,
    generate_timeseries,
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


@router.post("/summary/upload", response_model=SummaryResponse)
async def post_summary_upload(file: UploadFile = File(...)) -> Dict[str, Any]:
    content = await file.read()
    try:
        from io import BytesIO
        df = pd.read_csv(BytesIO(content))
    except Exception as e:
        return {"mean": {}, "median": {}, "variance": {"error": float("nan")}}
    stats = calculate_summary_statistics(df)
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


@router.post("/histogram/upload", response_model=HistogramResponse)
async def post_histogram_upload(
    file: UploadFile = File(...),
    column: Optional[str] = Query(default=None),
    bins: int = Query(default=10, ge=1, le=200),
) -> Dict[str, Any]:
    content = await file.read()
    from io import BytesIO
    try:
        df = pd.read_csv(BytesIO(content))
    except Exception:
        return {"data": []}
    col = column or (df.columns[0] if len(df.columns) > 0 else None)
    if col is None or col not in df.columns:
        return {"data": []}
    hist = generate_histogram_data(df, col, bins=bins)
    out = [{"value": str(k), "count": float(v)} for k, v in hist.items()]
    return {"data": out}


@router.post("/columns/upload")
async def post_columns_upload(file: UploadFile = File(...)) -> Dict[str, Any]:
    content = await file.read()
    from io import BytesIO
    try:
        df = pd.read_csv(BytesIO(content))
    except Exception:
        return {"columns": []}
    cols = infer_column_types(df)
    return {"columns": cols}


@router.post("/timeseries/upload")
async def post_timeseries_upload(
    file: UploadFile = File(...),
    date_column: str = Query(...),
    value_column: str = Query(...),
    freq: str = Query("D"),
    agg: str = Query("sum"),
) -> Dict[str, Any]:
    content = await file.read()
    from io import BytesIO
    try:
        df = pd.read_csv(BytesIO(content))
    except Exception:
        return {"data": []}
    ts = generate_timeseries(df, date_column=date_column, value_column=value_column, freq=freq, agg=agg)
    return ts
