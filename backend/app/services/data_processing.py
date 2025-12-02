from __future__ import annotations
from typing import Dict, Any, List
import pandas as pd
import numpy as np


def load_csv(file_path: str) -> pd.DataFrame:
    try:
        df = pd.read_csv(file_path)
        return df
    except Exception as e:
        raise ValueError(f"Error loading CSV file: {e}")


def calculate_summary_statistics(data: pd.DataFrame) -> Dict[str, Any]:
    numeric = data.select_dtypes(include=["number"])  # ignore non numeric
    mean_vals = numeric.mean(numeric_only=True).to_dict()
    median_vals = numeric.median(numeric_only=True).to_dict()
    variance_vals = numeric.var(numeric_only=True, ddof=1).to_dict()
    summary = {
        "mean": mean_vals,
        "median": median_vals,
        "variance": variance_vals,
    }
    return summary


def generate_histogram_data(data: pd.DataFrame, column_name: str, bins: int = 10):
    series = pd.to_numeric(data[column_name], errors="coerce").dropna()
    hist = pd.cut(series, bins=bins).value_counts().sort_index()
    return hist.to_dict()


def infer_column_types(df: pd.DataFrame) -> List[Dict[str, str]]:
    types: List[Dict[str, str]] = []
    for col in df.columns:
        dtype = df[col].dtype
        col_type = "string"
        if np.issubdtype(dtype, np.number):
            col_type = "number"
        else:
            try:
                parsed = pd.to_datetime(
                    df[col].dropna().head(50),
                    errors="raise",
                    infer_datetime_format=True,
                )
                if len(parsed) > 0:
                    col_type = "datetime"
            except Exception:
                col_type = "string"
        types.append({"name": col, "type": col_type})
    return types


def generate_timeseries(
    df: pd.DataFrame,
    date_column: str,
    value_column: str,
    freq: str = "D",
    agg: str = "sum",
) -> Dict[str, Any]:
    if date_column not in df.columns or value_column not in df.columns:
        raise ValueError("Columns not found in DataFrame")
    dates = pd.to_datetime(df[date_column], errors="coerce", infer_datetime_format=True)
    values = pd.to_numeric(df[value_column], errors="coerce")
    ts = pd.DataFrame({"date": dates, "value": values}).dropna()
    ts = ts.set_index("date").sort_index()
    if agg == "sum":
        res = ts.resample(freq).sum()
    elif agg == "mean":
        res = ts.resample(freq).mean()
    else:
        raise ValueError("Unsupported agg; use 'sum' or 'mean'")
    res = res.dropna()
    data = [
        {"date": idx.strftime("%Y-%m-%d"), "value": float(val)}
        for idx, val in res["value"].items()
    ]
    return {"data": data}
