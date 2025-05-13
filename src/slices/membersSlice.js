import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMembers, addMember, deleteMember, editMember } from "../services/adminService";

export const fetchMembersAsync = createAsyncThunk("members/fetchMembers", async () => {
    const response = await fetchMembers();
    return response;
});

export const addMemberAsync = createAsyncThunk("members/addMember", async (newMember, { dispatch }) => {
    await addMember(newMember);
    // Fetch the updated list of members after adding a new member
    dispatch(fetchMembersAsync());
});

export const deleteMemberAsync = createAsyncThunk("members/deleteMember", async (id) => {
    await deleteMember(id);
    return id;
});

export const editMemberAsync = createAsyncThunk("members/editMember", async (updatedMember) => {
    await editMember(updatedMember);
    return updatedMember;
});

const membersSlice = createSlice({
    name: "members",
    initialState: { members: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembersAsync.fulfilled, (state, action) => {
                state.members = action.payload;
            })
            .addCase(deleteMemberAsync.fulfilled, (state, action) => {
                state.members = state.members.filter((member) => member.id !== action.payload);
            })
            .addCase(editMemberAsync.fulfilled, (state, action) => {
                const index = state.members.findIndex((member) => member.id === action.payload.id);
                if (index !== -1) {
                    state.members[index] = action.payload;
                }
            });
    },
});

export default membersSlice.reducer;