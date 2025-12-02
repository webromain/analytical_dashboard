# Analytical Dashboard

## Overview
The Analytical Dashboard is a web application designed to provide statistical insights and visualizations from data. It leverages FastAPI for the backend and modern JavaScript libraries for the frontend to create an interactive user experience.

## Features
- **Statistical Summaries**: Retrieve mean, median, and variance of datasets.
- **Data Visualization**: Generate histograms and other visual representations of data.
- **Responsive Design**: The frontend is built to be user-friendly and responsive.

## Installation

### Backend
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Install the required JavaScript packages:
   ```
   npm install
   ```

## Usage

### Running the Backend
To start the FastAPI application, run the following command in the `backend` directory:
```
uvicorn app.main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

### Running the Frontend
To start the frontend application, run the following command in the `frontend` directory:
```
npm start
```
The frontend will be available at `http://localhost:3000`.

## API Endpoints
- **GET /summary**: Returns statistical summaries (mean, median, variance).
- **GET /histogram**: Returns data for histogram visualization.

## Testing
Unit tests are included for both the backend and frontend. To run the tests:

### Backend Tests
In the `backend` directory, run:
```
pytest tests/
```

### Frontend Tests
In the `frontend` directory, run:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.