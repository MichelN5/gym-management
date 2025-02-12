import React, { useState, useEffect } from "react";
import logEvent from "../utils/logEvent"; // Import logging utility
import { auth } from "../firebase";

const Payments = ({ bills, members, users, createBill, togglePaymentStatus }) => {
    const [newBill, setNewBill] = useState({
        memberId: "",
        amount: "",
        description: "",
    });

    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoggedInUserId(user ? user.uid : null);
        });
        return () => unsubscribe();
    }, []);

    const handleCreateBill = async () => {
        const selectedMember = members.find((m) => m.id === newBill.memberId);
        if (!selectedMember) {
            alert("Invalid member selected!");
            return;
        }

        await createBill({
            ...newBill,
            userId: selectedMember.userId,
        });

        await logEvent(
            "CREATE_BILL",
            `Bill of $${newBill.amount} created for member ${selectedMember.name} with description: ${newBill.description}`,
            loggedInUserId || "Unknown"
        );

        setNewBill({ memberId: "", amount: "", description: "" });
    };

    const handleTogglePaymentStatus = async (billId, currentStatus) => {
        await togglePaymentStatus(billId, currentStatus);
        await logEvent(
            "TOGGLE_PAYMENT_STATUS",
            `Payment status for bill ${billId} changed from ${currentStatus} to ${currentStatus === "pending" ? "paid" : "pending"}`,
            loggedInUserId || "Unknown"
        );
    };

    return (
        <div className="card">
            <h2>Create Bill</h2>
            <div className="payment-form">
                <select
                    value={newBill.memberId}
                    onChange={(e) => setNewBill({ ...newBill, memberId: e.target.value })}
                >
                    <option value="">Select Member</option>
                    {members.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Amount"
                    value={newBill.amount}
                    onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newBill.description}
                    onChange={(e) => setNewBill({ ...newBill, description: e.target.value })}
                />
                <button onClick={handleCreateBill}>Create Bill</button>
            </div>

            <h2>Manage Payments</h2>
            <div className="table-responsive">
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => {
                            const member = members.find((m) => m.id === bill.memberId);
                            return (
                                <tr key={bill.id}>
                                    <td data-label="Member">{member?.name || "Deleted Member"}</td>
                                    <td data-label="Amount">${bill.amount}</td>
                                    <td data-label="Description">{bill.description}</td>
                                    <td data-label="Date">
                                        {bill.timestamp?.toDate().toLocaleDateString()}
                                    </td>
                                    <td data-label="Status">
                                        <span className={`status-badge ${bill.status}`}>
                                            {bill.status}
                                        </span>
                                    </td>
                                    <td data-label="Action">
                                        <button
                                            className={`status-toggle ${bill.status}`}
                                            onClick={() => handleTogglePaymentStatus(bill.id, bill.status)}
                                        >
                                            Mark as {bill.status === "pending" ? "Paid" : "Pending"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
