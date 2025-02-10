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
            <table className="member-table">
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Price ($)</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feePackages.map((pkg) => (
                        <tr key={pkg.id}>
                            <td>{pkg.name}</td>
                            <td>{pkg.price}</td>
                            <td>{pkg.duration}</td>
                            <td>
                                <button onClick={() => deleteFeePackage(pkg.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeePackages;
