import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFeePackages, addFeePackage, deleteFeePackage } from "../services/adminService";

// Async thunk to fetch fee packages
export const fetchFeePackagesAsync = createAsyncThunk("feePackages/fetchFeePackages", async () => {
    const response = await fetchFeePackages();
    return response;
});

// Async thunk to add a fee package
export const addFeePackageAsync = createAsyncThunk("feePackages/addFeePackage", async (newPackage) => {
    const response = await addFeePackage(newPackage); // Ensure this returns the created package with its ID
    return response; // Return the full response from the backend
});

// Async thunk to delete a fee package
export const deleteFeePackageAsync = createAsyncThunk(
    "feePackages/deleteFeePackage",
    async (id, { dispatch }) => {
        await deleteFeePackage(id);
        // Fetch the updated list of fee packages after deletion
        dispatch(fetchFeePackagesAsync());
    }
);

// Fee packages slice
const feePackagesSlice = createSlice({
    name: "feePackages",
    initialState: { feePackages: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeePackagesAsync.fulfilled, (state, action) => {
                state.feePackages = action.payload;
            })
            .addCase(addFeePackageAsync.fulfilled, (state, action) => {
                state.feePackages.push(action.payload);
            });
    },
});

export default feePackagesSlice.reducer;