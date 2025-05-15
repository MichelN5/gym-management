import React from "react";

const MemberTable = ({ members, feePackages, editingMember, setEditingMember, onEdit, onDelete }) => {
    return (
        <table className="member-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Fee Package</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {members.map((member) => (
                    <tr key={member.id}>
                        <td data-label="Name">
                            {editingMember?.id === member.id ? (
                                <input
                                    type="text"
                                    value={editingMember?.name || ""}
                                    onChange={(e) =>
                                        setEditingMember({ ...editingMember, name: e.target.value })
                                    }
                                />
                            ) : (
                                member.name
                            )}
                        </td>
                        <td data-label="Phone">
                            {editingMember?.id === member.id ? (
                                <input
                                    type="text"
                                    value={editingMember?.phone || ""}
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
                                    value={editingMember?.fee_package?.id || editingMember?.fee_package || ""}
                                    onChange={(e) =>
                                        setEditingMember({
                                            ...editingMember,
                                            fee_package: e.target.value,
                                        })
                                    }
                                >
                                    {feePackages.map((pkg) => (
                                        <option key={pkg.id} value={pkg.id}>
                                            {pkg.name} - ${pkg.price} ({pkg.duration})
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                member.fee_package?.name
                                    ? `${member.fee_package.name} - $${member.fee_package.price} (${member.fee_package.duration})`
                                    : "N/A"
                            )}
                        </td>
                        <td data-label="Actions">
                            {editingMember?.id === member.id ? (
                                <>
                                    <button onClick={onEdit}>Save</button>
                                    <button onClick={() => setEditingMember(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setEditingMember(member)}>Edit</button>
                                    <button onClick={() => onDelete(member.id)}>Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MemberTable;