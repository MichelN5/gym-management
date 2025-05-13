import { useState, useEffect } from "react";
import { fetchMembers, addMember, deleteMember, editMember } from "../services/adminService";

export const useMembers = () => {
    const [members, setMembers] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchMembers();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    const addMemberHandler = async (newMember) => {
        try {
            await addMember(newMember);
            fetchData();
        } catch (error) {
            console.error("Error adding member:", error);
        }
    };

    const deleteMemberHandler = async (id) => {
        try {
            await deleteMember(id);
            fetchData();
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    const editMemberHandler = async (updatedMember) => {
        try {
            await editMember(updatedMember);
            fetchData();
        } catch (error) {
            console.error("Error editing member:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { members, addMember: addMemberHandler, deleteMember: deleteMemberHandler, editMember: editMemberHandler };
};