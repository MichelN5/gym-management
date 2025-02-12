import React, { useState, useEffect } from "react";
import logEvent from "../utils/logEvent"; // Import logging utility
import { auth } from "../firebase";

const Members = ({ members, users, feePackages, addMember, deleteMember }) => {
    const [newMember, setNewMember] = useState({
        userId: "",
        name: "",
        phone: "",
        feePackage: "",
    });

    const [loggedInUserId, setLoggedInUserId] = useState(null);

    // Get the currently logged-in user's ID
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoggedInUserId(user ? user.uid : null);
        });
        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const handleAddMember = async () => {
        await addMember(newMember);
        await logEvent(
            "ENROLL_MEMBER",
            `User "${newMember.name}" enrolled successfully with Fee Package "${newMember.feePackage}"`,
            loggedInUserId || "Unknown"
        );
    };

    const handleDeleteMember = async (id) => {
        await deleteMember(id);
        await logEvent(
            "DELETE_MEMBER",
            `Member with ID "${id}" was removed.`,
            loggedInUserId || "Unknown"
        );
    };

    return (
        <div className="card">
            <h2>Enroll Existing User</h2>
            <div className="member-form">
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
                <button onClick={handleAddMember}>Enroll Member</button>
            </div>

            <h2>Gym Members</h2>
            <table className="member-table">
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
                                <td data-label="Name">{member.name}</td>
                                <td data-label="Email">{user?.email || "N/A"}</td>
                                <td data-label="Phone">{member.phone}</td>
                                <td data-label="Fee Package">
                                    {feePackages.find((pkg) => pkg.id === member.feePackage)?.name || "N/A"}
                                </td>
                                <td data-label="Actions">
                                    <button onClick={() => handleDeleteMember(member.id)}>
                                        Cancel
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
