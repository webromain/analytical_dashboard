from pydantic import BaseModel
from typing import List, Optional

class SummaryResponse(BaseModel):
    mean: float
    median: float
    variance: float

class HistogramData(BaseModel):
    bins: List[float]
    frequencies: List[int]

class DataPoint(BaseModel):
    value: float
    timestamp: Optional[str] = None  # Optional timestamp for time series data
