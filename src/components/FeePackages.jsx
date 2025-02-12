import React, { useState, useEffect } from "react";
import logEvent from "../utils/logEvent"; // Import logging utility
import { auth } from "../firebase";

const FeePackages = ({ feePackages, addFeePackage, deleteFeePackage }) => {
    const [newFeePackage, setNewFeePackage] = useState({
        name: "",
        price: "",
        duration: "",
    });

    const [userId, setUserId] = useState(null);

    // Get user ID when component mounts
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const handleAddPackage = async () => {
        await addFeePackage(newFeePackage);
        await logEvent(
            "ADD_FEE_PACKAGE",
            `Fee package "${newFeePackage.name}" added successfully`,
            userId || "Unknown" // Handle null user ID
        );
    };

    const handleDeletePackage = async (id) => {
        await deleteFeePackage(id);
        await logEvent(
            "DELETE_FEE_PACKAGE",
            `Fee package with ID "${id}" deleted successfully`,
            userId || "Unknown"
        );
    };

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
                <button onClick={handleAddPackage}>Add Package</button>
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
                                <button onClick={() => handleDeletePackage(pkg.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeePackages;
