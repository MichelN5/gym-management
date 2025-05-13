import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMembersAsync,
    addMemberAsync,
    deleteMemberAsync,
    editMemberAsync,
} from "../slices/membersSlice";
import { fetchFeePackagesAsync } from "../slices/feePackagesSlice";
import MemberForm from "./MemberForm";
import MemberTable from "./MemberTable";

const Members = ({ users }) => {
    const dispatch = useDispatch();
    const members = useSelector((state) => state.members.members);
    const feePackages = useSelector((state) => state.feePackages.feePackages);

    const [newMember, setNewMember] = useState({ user: "", name: "", phone: "", fee_package: "" });
    const [editingMember, setEditingMember] = useState(null);

    useEffect(() => {
        dispatch(fetchMembersAsync());
        dispatch(fetchFeePackagesAsync()); // Fetch fee packages here
    }, [dispatch]);

    const handleAddMember = async () => {
        if (!newMember.user || !newMember.name || !newMember.phone || !newMember.fee_package) {
            alert("Please fill in all fields.");
            return;
        }

        dispatch(addMemberAsync(newMember));
        setNewMember({ user: "", name: "", phone: "", fee_package: "" });
    };

    const handleDeleteMember = async (id) => {
        dispatch(deleteMemberAsync(id));
    };

    const handleEditMember = async () => {
        if (!editingMember) return;

        const memberToUpdate = {
            ...editingMember,
            fee_package: editingMember.fee_package?.id || editingMember.fee_package,
        };

        dispatch(editMemberAsync(memberToUpdate));
        setEditingMember(null);
    };

    return (
        <div className="card">
            <h2>Enroll Existing User</h2>
            <MemberForm
                newMember={newMember}
                setNewMember={setNewMember}
                users={users}
                feePackages={feePackages} // Pass feePackages as a prop
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