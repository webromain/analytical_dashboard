from __future__ import annotations
from typing import Dict, Any
import pandas as pd


def load_csv(file_path: str) -> pd.DataFrame:
    try:
        df = pd.read_csv(file_path)
        return df
    except Exception as e:
        raise ValueError(f"Error loading CSV file: {e}")


def calculate_summary_statistics(data: pd.DataFrame) -> Dict[str, Any]:
    numeric = data.select_dtypes(include=["number"])  # ignore non numeric
    summary = {
        "mean": numeric.mean(numeric_only=True).to_dict(),
        "median": numeric.median(numeric_only=True).to_dict(),
        "variance": numeric.var(numeric_only=True, ddof=1).to_dict(),
    }
    return summary


def generate_histogram_data(data: pd.DataFrame, column_name: str, bins: int = 10):
    series = pd.to_numeric(data[column_name], errors="coerce").dropna()
    hist = pd.cut(series, bins=bins).value_counts().sort_index()
    return hist.to_dict()
