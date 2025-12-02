import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.data_processing import load_csv, calculate_statistics

client = TestClient(app)

def test_load_csv():
    # Assuming there is a sample CSV file for testing
    sample_file = "tests/sample_data.csv"
    data = load_csv(sample_file)
    assert data is not None
    assert isinstance(data, list)  # Assuming the CSV is loaded into a list of dictionaries

def test_calculate_statistics():
    sample_data = [1, 2, 3, 4, 5]
    stats = calculate_statistics(sample_data)
    assert stats['mean'] == 3
    assert stats['median'] == 3
    assert stats['variance'] == 2.5

def test_summary_endpoint():
    response = client.get("/summary")
    assert response.status_code == 200
    assert "mean" in response.json()
    assert "median" in response.json()
    assert "variance" in response.json()

def test_histogram_endpoint():
    response = client.get("/histogram")
    assert response.status_code == 200
    assert "histogram" in response.json()