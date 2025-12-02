from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.api.endpoints.data import router

app = FastAPI()
app.include_router(router)

client = TestClient(app)

def test_summary_endpoint():
    response = client.get("/summary")
    assert response.status_code == 200
    assert "mean" in response.json()
    assert "median" in response.json()
    assert "variance" in response.json()

def test_histogram_endpoint():
    response = client.get("/histogram")
    assert response.status_code == 200
    assert "data" in response.json()  # Assuming the response contains a 'data' key
    assert isinstance(response.json()["data"], list)  # Assuming the histogram data is a list