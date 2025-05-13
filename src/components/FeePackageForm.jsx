import React from "react";

const FeePackageForm = ({ newFeePackage, setNewFeePackage, onSubmit }) => {
    return (
        <div className="package-form">
            <input
                type="text"
                placeholder="Package Name"
                value={newFeePackage.name}
                onChange={(e) => setNewFeePackage({ ...newFeePackage, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={newFeePackage.price || ""}
                onChange={(e) => setNewFeePackage({ ...newFeePackage, price: e.target.value })}
            />
            <input
                type="text"
                placeholder="Duration (e.g., 1 month)"
                value={newFeePackage.duration}
                onChange={(e) => setNewFeePackage({ ...newFeePackage, duration: e.target.value })}
            />
            <button onClick={onSubmit}>Add Package</button>
        </div>
    );
};

export default FeePackageForm;