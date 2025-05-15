import React from "react";

const PaymentTable = ({ bills, members, onToggleStatus }) => {
    return (
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
                                <td data-label="Member">{bill.member.name || "Deleted Member"}</td>
                                <td data-label="Amount">${bill.amount}</td>
                                <td data-label="Description">{bill.description}</td>
                                <td data-label="Date">
                                    {new Date(bill.created_at).toISOString().split("T")[0]}
                                </td>
                                <td data-label="Status">
                                    <span className={`status-badge ${bill.status}`}>
                                        {bill.status}
                                    </span>
                                </td>
                                <td data-label="Action">
                                    <button
                                        className={`status-toggle ${bill.status}`}
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent page refresh
                                            onToggleStatus(bill.id, bill.status);
                                        }}
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

export default PaymentTable;