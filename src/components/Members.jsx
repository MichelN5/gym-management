import React, { useState, useEffect } from "react";
import logEvent from "../utils/logEvent";
import { auth } from "../firebase";

const Members = ({ members, users, feePackages, addMember, deleteMember, editMember }) => {
    const [newMember, setNewMember] = useState({
        userId: "",
        name: "",
        phone: "",
        feePackage: "",
    });

    const [editingMember, setEditingMember] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoggedInUserId(user ? user.uid : null);
        });
        return () => unsubscribe();
    }, []);

    const handleAddMember = async () => {
        await addMember(newMember);
        await logEvent(
            "ENROLL_MEMBER",
            `User "${newMember.name}" enrolled successfully with Fee Package "${newMember.feePackage}"`,
            loggedInUserId || "Unknown"
        );
        setNewMember({ userId: "", name: "", phone: "", feePackage: "" });
    };

    const handleDeleteMember = async (id) => {
        await deleteMember(id);
        await logEvent(
            "DELETE_MEMBER",
            `Member with ID "${id}" was removed.`,
            loggedInUserId || "Unknown"
        );
    };

    const handleEditMember = async () => {
        if (!editingMember) return;

        await editMember(editingMember);
        await logEvent(
            "EDIT_MEMBER",
            `Member with ID "${editingMember.id}" was updated.`,
            loggedInUserId || "Unknown"
        );
        setEditingMember(null);
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
                                <td data-label="Name">
                                    {editingMember?.id === member.id ? (
                                        <input
                                            type="text"
                                            value={editingMember.name}
                                            onChange={(e) =>
                                                setEditingMember({ ...editingMember, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        member.name
                                    )}
                                </td>
                                <td data-label="Email">
                                    {user?.email || "N/A"}
                                </td>
                                <td data-label="Phone">
                                    {editingMember?.id === member.id ? (
                                        <input
                                            type="text"
                                            value={editingMember.phone}
                                            onChange={(e) =>
                                                setEditingMember({ ...editingMember, phone: e.target.value })
                                            }
                                        />
                                    ) : (
                                        member.phone
                                    )}
                                </td>
                                <td data-label="Fee Package">
                                    {editingMember?.id === member.id ? (
                                        <select
                                            value={editingMember.feePackage}
                                            onChange={(e) =>
                                                setEditingMember({ ...editingMember, feePackage: e.target.value })
                                            }
                                        >
                                            {feePackages.map((pkg) => (
                                                <option key={pkg.id} value={pkg.id}>
                                                    {pkg.name} - ${pkg.price} ({pkg.duration})
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        feePackages.find((pkg) => pkg.id === member.feePackage)?.name || "N/A"
                                    )}
                                </td>
                                <td data-label="Actions">
                                    {editingMember?.id === member.id ? (
                                        <>
                                            <button onClick={handleEditMember}>Save</button>
                                            <button onClick={() => setEditingMember(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => setEditingMember(member)}>Edit</button>
                                            <button onClick={() => handleDeleteMember(member.id)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
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