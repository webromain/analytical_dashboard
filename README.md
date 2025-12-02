# Analytical Dashboard

## Overview
The Analytical Dashboard is a web application designed to provide statistical insights and visualizations from data. It leverages FastAPI for the backend and a JavaScript framework for the frontend, allowing users to interact with data through a user-friendly interface.

## Goals
- To provide statistical summaries (mean, median, variance) of uploaded datasets.
- To visualize data through interactive charts.
- To offer a seamless user experience with a responsive design.

## Installation Instructions

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
The application will be available at `http://127.0.0.1:8000`.

### Running the Frontend
To start the frontend application, run the following command in the `frontend` directory:
```
npm start
```
The frontend will be available at `http://localhost:3000`.

## Statistical Concepts
- **Mean**: The average of a set of numbers, calculated by dividing the sum of all values by the count of values.
- **Median**: The middle value in a list of numbers, which separates the higher half from the lower half.
- **Variance**: A measure of how much values in a dataset differ from the mean, indicating the spread of the data.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.