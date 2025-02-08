import React, { useState } from "react"; // Add useState import here

const Payments = ({ bills, members, users, createBill, togglePaymentStatus }) => {
    const [newBill, setNewBill] = useState({
        memberId: "",
        amount: "",
        description: "",
    });

    return (
        <div className="card">
            <h2>Create Bill</h2>
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
            <button onClick={() => createBill(newBill)}>Create Bill</button>

            <h2>Manage Payments</h2>
            <table>
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
                        const user = users.find((u) => u.id === member?.userId);
                        return (
                            <tr key={bill.id}>
                                <td>{member?.name || "Deleted Member"}</td>
                                <td>${bill.amount}</td>
                                <td>{bill.description}</td>
                                <td>{bill.timestamp?.toDate().toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-badge ${bill.status}`}>
                                        {bill.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className={`status-toggle ${bill.status}`}
                                        onClick={() => togglePaymentStatus(bill.id, bill.status)}
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
    );
};

export default Payments;