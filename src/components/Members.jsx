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

        await dispatch(addMemberAsync(newMember));
        dispatch(fetchMembersAsync()); // Refetch members after adding
        setNewMember({ user: "", name: "", phone: "", fee_package: "" });
    };

    const handleDeleteMember = async (id) => {
        await dispatch(deleteMemberAsync(id));
        dispatch(fetchMembersAsync()); // Refetch members after deleting
    };

    const handleEditMember = async () => {
        if (!editingMember) return;

        const selectedFeePackage = feePackages.find(
            (pkg) => pkg.id === editingMember.fee_package
        );

        const memberToUpdate = {
            ...editingMember,
            fee_package: selectedFeePackage || editingMember.fee_package, // Ensure the full fee package object is included
        };

        await dispatch(editMemberAsync(memberToUpdate));
        dispatch(fetchMembersAsync()); // Refetch members after editing
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