import React, { useState } from "react";
import FeePackageForm from "./FeePackageForm";
import FeePackageTable from "./FeePackageTable";

const FeePackages = ({ feePackages, addFeePackage, deleteFeePackage }) => {
    const [newFeePackage, setNewFeePackage] = useState({ name: "", price: "", duration: "" });

    const handleAddPackage = async () => {
        if (!newFeePackage.name.trim() || !newFeePackage.price || !newFeePackage.duration.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const formattedPackage = { ...newFeePackage, price: Number(newFeePackage.price) };

        try {
            await addFeePackage(formattedPackage);
            setNewFeePackage({ name: "", price: "", duration: "" });
        } catch (error) {
            console.error("Error adding fee package:", error);
        }
    };

    const handleDeletePackage = async (id) => {
        try {
            await deleteFeePackage(id);
        } catch (error) {
            console.error("Error deleting fee package:", error);
        }
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
