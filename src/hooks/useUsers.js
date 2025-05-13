import { useState, useEffect } from "react";
import { fetchUsers } from "../services/adminService"; // Replace with your actual service

export const useUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchUsers(); // Fetch users from your API
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { users };
};