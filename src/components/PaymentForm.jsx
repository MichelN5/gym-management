import React from "react";

const PaymentForm = ({ newBill, setNewBill, members, onSubmit }) => {
    return (
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
            <button
                type="button" // Explicitly set the button type to "button"
                onClick={(e) => {
                    e.preventDefault(); // Prevent page refresh
                    onSubmit();
                }}
            >
                Create Bill
            </button>
        </div>
    );
};

export default PaymentForm;