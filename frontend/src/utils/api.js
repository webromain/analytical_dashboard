// frontend/src/utils/api.js

const API_BASE_URL = 'http://localhost:8000'; // Adjust the base URL as needed

export const fetchSummary = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/summary`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching summary:', error);
        throw error;
    }
};

export const fetchHistogramData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/histogram`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching histogram data:', error);
        throw error;
    }
};