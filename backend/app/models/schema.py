from __future__ import annotations
from typing import Dict, List, Any
from pydantic import BaseModel


class SummaryResponse(BaseModel):
    mean: Dict[str, float]
    median: Dict[str, float]
    variance: Dict[str, float]


class HistogramBin(BaseModel):
    value: str
    count: float


class HistogramResponse(BaseModel):
    data: List[HistogramBin]
