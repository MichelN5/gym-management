import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "../slices/membersSlice";
import feePackagesReducer from "../slices/feePackagesSlice";
import paymentsReducer from "../slices/paymentsSlice";

export default configureStore({
    reducer: {
        members: membersReducer,
        feePackages: feePackagesReducer,
        payments: paymentsReducer,
    },
});