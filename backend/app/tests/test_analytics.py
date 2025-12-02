from pathlib import Path
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

PROJECT_ROOT = Path(__file__).resolve().parents[3]
SAMPLE = PROJECT_ROOT / "data" / "sample.csv"


def test_summary_default():
    r = client.get("/summary")
    assert r.status_code == 200
    data = r.json()
    assert "mean" in data and "median" in data and "variance" in data


def test_summary_with_file():
    r = client.get(f"/summary?file_path={SAMPLE.as_posix()}")
    assert r.status_code == 200
    data = r.json()
    assert "value" in data["mean"]


def test_histogram_default():
    r = client.get("/histogram")
    assert r.status_code == 200
    body = r.json()
    assert "data" in body and isinstance(body["data"], list)


def test_histogram_with_file():
    r = client.get(f"/histogram?file_path={SAMPLE.as_posix()}&column=value&bins=5")
    assert r.status_code == 200
    body = r.json()
    assert "data" in body and len(body["data"]) > 0
