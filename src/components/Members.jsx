import React, { useState } from "react";

const Members = ({ members, users, feePackages, addMember, deleteMember }) => {
    const [newMember, setNewMember] = useState({
        userId: "",
        name: "",
        phone: "",
        feePackage: "",
    });

    return (
        <div className="card">
            <h2>Enroll Existing User</h2>
            <select
                value={newMember.userId}
                onChange={(e) => setNewMember({ ...newMember, userId: e.target.value })}
            >
                <option value="">Select User</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.email} ({user.role})
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
                value={newMember.feePackage}
                onChange={(e) => setNewMember({ ...newMember, feePackage: e.target.value })}
            >
                <option value="">Select Fee Package</option>
                {feePackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - ${pkg.price} ({pkg.duration})
                    </option>
                ))}
            </select>
            <button onClick={() => addMember(newMember)}>Enroll Member</button>

            <h2>Gym Members</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Fee Package</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => {
                        const user = users.find((u) => u.id === member.userId);
                        return (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{user?.email || "N/A"}</td>
                                <td>{member.phone}</td>
                                <td>
                                    {feePackages.find((pkg) => pkg.id === member.feePackage)?.name || "N/A"}
                                </td>
                                <td>
                                    <button onClick={() => deleteMember(member.id)}>
                                        Cancel Membership
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

export default Members;