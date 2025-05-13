import React from "react";

const MemberForm = ({ newMember, setNewMember, users, feePackages, onSubmit }) => {
    return (
        <div className="member-form">
            <select
                value={newMember.user}
                onChange={(e) => setNewMember({ ...newMember, user: e.target.value })}
            >
                <option value="">Select User</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.username}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Phone"
                value={newMember.phone}
                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
            />
            <select
                value={newMember.fee_package}
                onChange={(e) => setNewMember({ ...newMember, fee_package: e.target.value })}
            >
                <option value="">Select Fee Package</option>
                {feePackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - ${pkg.price} ({pkg.duration})
                    </option>
                ))}
            </select>
            <button onClick={onSubmit}>Enroll Member</button>
        </div>
    );
};

export default MemberForm;