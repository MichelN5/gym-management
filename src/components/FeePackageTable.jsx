import React from "react";

const FeePackageTable = ({ feePackages, onDelete }) => {
    return (
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
                    <tr key={pkg.id || `${pkg.name}-${pkg.price}-${pkg.duration}`}>
                        <td>{pkg.name}</td>
                        <td>{pkg.price}</td>
                        <td>{pkg.duration}</td>
                        <td>
                            <button onClick={() => onDelete(pkg.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FeePackageTable;