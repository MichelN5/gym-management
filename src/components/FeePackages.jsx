import React, { useState } from "react";

const FeePackages = ({ feePackages, addFeePackage, deleteFeePackage }) => {
    const [newFeePackage, setNewFeePackage] = useState({
        name: "",
        price: "",
        duration: "",
    });

    return (
        <div className="card">
            <h2>Manage Fee Packages</h2>
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
                    value={newFeePackage.price}
                    onChange={(e) => setNewFeePackage({ ...newFeePackage, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Duration (e.g., 1 month)"
                    value={newFeePackage.duration}
                    onChange={(e) => setNewFeePackage({ ...newFeePackage, duration: e.target.value })}
                />
                <button onClick={() => addFeePackage(newFeePackage)}>Add Package</button>
            </div>
            <div className="package-list">
                {feePackages.map((pkg) => (
                    <div key={pkg.id} className="package-item">
                        <span>{pkg.name} (${pkg.price} - {pkg.duration})</span>
                        <button onClick={() => deleteFeePackage(pkg.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeePackages;