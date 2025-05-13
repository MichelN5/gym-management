import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import PaymentTable from "./PaymentTable";

const Payments = ({ bills, members, createBill, togglePaymentStatus }) => {
    const [newBill, setNewBill] = useState({ memberId: "", amount: "", description: "" });

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

        await createBill(billData);
        setNewBill({ memberId: "", amount: "", description: "" });
    };

    const handleTogglePaymentStatus = async (billId, currentStatus) => {
        await togglePaymentStatus(billId, currentStatus);
    };

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
