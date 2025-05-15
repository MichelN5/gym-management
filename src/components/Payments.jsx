import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBillsThunk, createBillThunk, togglePaymentStatusThunk } from "../slices/paymentsSlice";
import PaymentForm from "./PaymentForm";
import PaymentTable from "./PaymentTable";

const Payments = ({ members }) => {
    const dispatch = useDispatch();
    const { bills, loading, error } = useSelector((state) => state.payments);
    const [newBill, setNewBill] = useState({ memberId: "", amount: "", description: "" });

    useEffect(() => {
        dispatch(fetchBillsThunk());
    }, [dispatch]);

    const handleCreateBill = async () => {
        const selectedMember = members.find((m) => m.id == newBill.memberId);

        if (!selectedMember) {
            alert("Invalid member selected!");
            return;
        }

        const billData = {
            member: selectedMember.id,
            amount: newBill.amount,
            description: newBill.description,
        };

        dispatch(createBillThunk(billData));
        setNewBill({ memberId: "", amount: "", description: "" });
    };

    const handleTogglePaymentStatus = async (billId, currentStatus) => {
        dispatch(togglePaymentStatusThunk({ billId, currentStatus }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="card">
            <h2>Create Bill</h2>
            <PaymentForm
                newBill={newBill}
                setNewBill={setNewBill}
                members={members}
                onSubmit={handleCreateBill}
            />
            <h2>Manage Payments</h2>
            <PaymentTable
                bills={bills}
                members={members}
                onToggleStatus={handleTogglePaymentStatus}
            />
        </div>
    );
};

export default Payments;
