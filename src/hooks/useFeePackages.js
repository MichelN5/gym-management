import { useState, useEffect } from "react";
import { fetchFeePackages, addFeePackage, deleteFeePackage } from "../services/adminService";

export const useFeePackages = () => {
    const [feePackages, setFeePackages] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchFeePackages();
            setFeePackages(data);
        } catch (error) {
            console.error("Error fetching fee packages:", error);
        }
    };

    const addPackage = async (newPackage) => {
        try {
            await addFeePackage(newPackage);
            fetchData();
        } catch (error) {
            console.error("Error adding fee package:", error);
        }
    };

    const deletePackage = async (id) => {
        try {
            await deleteFeePackage(id);
            fetchData();
        } catch (error) {
            console.error("Error deleting fee package:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { feePackages, addPackage, deletePackage };
};