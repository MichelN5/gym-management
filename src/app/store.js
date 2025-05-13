import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "../slices/membersSlice";
import feePackagesReducer from "../slices/feePackagesSlice";

export default configureStore({
    reducer: {
        members: membersReducer,
        feePackages: feePackagesReducer,
    },
});