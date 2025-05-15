import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBills, createBill, togglePaymentStatus } from "../services/adminService";

// Async thunks
export const fetchBillsThunk = createAsyncThunk("payments/fetchBills", async (_, { rejectWithValue }) => {
    try {
        const data = await fetchBills();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createBillThunk = createAsyncThunk("payments/createBill", async (newBill, { dispatch, rejectWithValue }) => {
    try {
        await createBill(newBill);
        dispatch(fetchBillsThunk());
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const togglePaymentStatusThunk = createAsyncThunk(
    "payments/togglePaymentStatus",
    async ({ billId, currentStatus }, { dispatch, rejectWithValue }) => {
        try {
            const newStatus = currentStatus === "pending" ? "paid" : "pending";
            await togglePaymentStatus(billId, newStatus);
            dispatch(fetchBillsThunk());
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const paymentsSlice = createSlice({
    name: "payments",
    initialState: {
        bills: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBillsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBillsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bills = action.payload;
            })
            .addCase(fetchBillsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default paymentsSlice.reducer;