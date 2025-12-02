# API Documentation for Analytical Dashboard

## Overview

This document provides detailed information about the API endpoints available in the Analytical Dashboard application. The API is built using FastAPI and allows users to retrieve statistical summaries and histogram data from the backend.

## Base URL

The base URL for the API is:

```
http://localhost:8000/api
```

## Endpoints

### 1. Get Statistical Summary

- **Endpoint:** `/summary`
- **Method:** `GET`
- **Description:** Returns statistical summaries (mean, median, variance) of the provided dataset.
- **Request Parameters:**
  - `file`: (required) The CSV file containing the data to be analyzed.
  
- **Response:**
  - **Status Code:** `200 OK`
  - **Content:**
    ```json
    {
      "mean": float,
      "median": float,
      "variance": float
    }
    ```

- **Example Request:**
  ```
  GET /api/summary?file=data.csv
  ```

- **Example Response:**
  ```json
  {
    "mean": 23.5,
    "median": 22.0,
    "variance": 5.2
  }
  ```

### 2. Get Histogram Data

- **Endpoint:** `/histogram`
- **Method:** `GET`
- **Description:** Returns histogram data for the provided dataset.
- **Request Parameters:**
  - `file`: (required) The CSV file containing the data to be analyzed.
  - `bins`: (optional) The number of bins for the histogram (default is 10).

- **Response:**
  - **Status Code:** `200 OK`
  - **Content:**
    ```json
    {
      "bins": [int],
      "counts": [int]
    }
    ```

- **Example Request:**
  ```
  GET /api/histogram?file=data.csv&bins=20
  ```

- **Example Response:**
  ```json
  {
    "bins": [0, 1, 2, 3, 4, 5],
    "counts": [10, 15, 20, 5, 2, 1]
  }
  ```

## Error Handling

In case of an error, the API will return a JSON response with an error message.

- **Example Error Response:**
  ```json
  {
    "detail": "File not found"
  }
  ```

## Conclusion

This API provides essential endpoints for retrieving statistical summaries and histogram data, facilitating data analysis for users of the Analytical Dashboard. For further assistance, please refer to the project documentation or contact the development team.