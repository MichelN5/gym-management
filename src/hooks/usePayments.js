import { useState, useEffect } from "react";
import { fetchBills, createBill, togglePaymentStatus } from "../services/adminService";

export const usePayments = () => {
    const [bills, setBills] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchBills();
            setBills(data);
        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    };

    const createBillHandler = async (newBill) => {
        try {
            await createBill(newBill);
            fetchData();
        } catch (error) {
            console.error("Error creating bill:", error);
        }
    };

    const togglePaymentStatusHandler = async (billId, currentStatus) => {
        try {
            const newStatus = currentStatus === "pending" ? "paid" : "pending";
            await togglePaymentStatus(billId, newStatus);
            fetchData();
        } catch (error) {
            console.error("Error toggling payment status:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { bills, createBill: createBillHandler, togglePaymentStatus: togglePaymentStatusHandler };
};