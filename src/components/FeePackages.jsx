import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFeePackagesAsync,
    addFeePackageAsync,
    deleteFeePackageAsync,
} from "../slices/feePackagesSlice";
import FeePackageForm from "./FeePackageForm";
import FeePackageTable from "./FeePackageTable";

const FeePackages = () => {
    const dispatch = useDispatch();
    const feePackages = useSelector((state) => state.feePackages.feePackages);

    const [newFeePackage, setNewFeePackage] = useState({ name: "", price: "", duration: "" });

    useEffect(() => {
        dispatch(fetchFeePackagesAsync());
    }, [dispatch]);

    const handleAddPackage = async () => {
        if (!newFeePackage.name.trim() || !newFeePackage.price || !newFeePackage.duration.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const formattedPackage = { ...newFeePackage, price: Number(newFeePackage.price) };

        dispatch(addFeePackageAsync(formattedPackage));
        setNewFeePackage({ name: "", price: "", duration: "" });
    };

    const handleDeletePackage = async (id) => {
        dispatch(deleteFeePackageAsync(id));
    };

    return (
        <div className="card">
            <h2>Manage Fee Packages</h2>
            <FeePackageForm
                newFeePackage={newFeePackage}
                setNewFeePackage={setNewFeePackage}
                onSubmit={handleAddPackage}
            />
            <FeePackageTable feePackages={feePackages} onDelete={handleDeletePackage} />
        </div>
    );
};

export default FeePackages;
