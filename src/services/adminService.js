import { ACCESS_TOKEN } from "../token";

// Use the API URL from the environment variables
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// Function to get the token from localStorage
const getToken = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
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

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    if (!response.ok) throw new Error(`Failed to ${method} ${endpoint}`);
    return method === "DELETE" ? null : response.json();
};

// Specific API functions
export const fetchFeePackages = () => apiRequest('fee-packages/all/');
export const fetchMembers = () => apiRequest('members/all/');
export const fetchUsers = () => apiRequest('users/all/');
export const fetchBills = () => apiRequest('bills/all/');
export const addFeePackage = (newPackage) => apiRequest('fee-packages/', 'POST', newPackage);
export const deleteFeePackage = (id) => apiRequest(`fee-packages/${id}/`, 'DELETE');
export const addMember = (newMember) => apiRequest('members/', 'POST', newMember);
export const deleteMember = (id) => apiRequest(`members/${id}/`, 'DELETE');
export const editMember = (updatedMember) => apiRequest(`members/${updatedMember.id}/`, 'PUT', updatedMember);
export const createBill = (newBill) => apiRequest('bills/', 'POST', { ...newBill, status: 'pending' });
export const togglePaymentStatus = (billId, newStatus) => apiRequest(`bills/${billId}/`, 'PATCH', { status: newStatus });
export const sendNotification = (message) => apiRequest('notifications/', 'POST', { message });