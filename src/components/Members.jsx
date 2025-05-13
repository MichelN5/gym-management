import React, { useState } from "react";
import MemberForm from "./MemberForm";
import MemberTable from "./MemberTable";

const Members = ({ members, users, feePackages, addMember, deleteMember, editMember }) => {
    const [newMember, setNewMember] = useState({ user: "", name: "", phone: "", fee_package: "" });
    const [editingMember, setEditingMember] = useState(null);

    const handleAddMember = async () => {
        if (!newMember.user || !newMember.name || !newMember.phone || !newMember.fee_package) {
            alert("Please fill in all fields.");
            return;
        }

        await addMember(newMember);
        setNewMember({ user: "", name: "", phone: "", fee_package: "" });
    };

    const handleDeleteMember = async (id) => {
        await deleteMember(id);
    };

    const handleEditMember = async () => {
        if (!editingMember) return;

        const memberToUpdate = {
            ...editingMember,
            fee_package: editingMember.fee_package?.id || editingMember.fee_package,
        };

        await editMember(memberToUpdate);
        setEditingMember(null);
    };

    return (
        <div className="card">
            <h2>Enroll Existing User</h2>
            <MemberForm
                newMember={newMember}
                setNewMember={setNewMember}
                users={users}
                feePackages={feePackages}
                onSubmit={handleAddMember}
            />
            <h2>Gym Members</h2>
            <MemberTable
                members={members}
                feePackages={feePackages}
                editingMember={editingMember}
                setEditingMember={setEditingMember}
                onEdit={handleEditMember}
                onDelete={handleDeleteMember}
            />
        </div>
    );
};

export default Members;