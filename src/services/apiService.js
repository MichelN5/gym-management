import { ACCESS_TOKEN, GOOGLE_ACCESS_TOKEN } from "../token";

// Use the API URL from the environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Function to get the token from localStorage
export const getToken = () => {
    const accesstoken = localStorage.getItem(ACCESS_TOKEN);
    const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);

    const token = accesstoken || googleAccessToken; // Use whichever token is available
    if (!token) {
        console.error('No access token found in localStorage.');
        return null;
    }
    return token;
};

// Generic function to handle API requests
const apiRequest = async (endpoint, method = "GET", data = null) => {
    const token = getToken();
    if (!token) throw new Error('Access token is missing.');

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    if (data) options.body = JSON.stringify(data);

    // Append '/api' to the base URL
    const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, options);
    if (!response.ok) throw new Error(`Failed to ${method} ${endpoint}`);
    return response.json();
};

// Specific API functions used in Dashboard.jsx
export const fetchCurrentUser = () => apiRequest('auth/user/');
export const fetchNotifications = () => apiRequest('notifications/all');
export const fetchUserBills = (userId) => apiRequest(`bills/user/${userId}/`);
