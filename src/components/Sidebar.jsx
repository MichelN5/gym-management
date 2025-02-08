import React from "react";
import { CSVLink } from "react-csv";

const Sidebar = ({ setActiveSection, members, bills, feePackages, users }) => {
    return (
        <div className="sidebar">
            <h2>GYM Management</h2>
            <ul>
                <li onClick={() => setActiveSection("feePackages")}>Fee Packages</li>
                <li onClick={() => setActiveSection("members")}>Members</li>
                <li onClick={() => setActiveSection("payments")}>Payments</li>
                <li onClick={() => setActiveSection("notifications")}>Notifications</li>
            </ul>
            <CSVLink
                data={members.map((member) => {
                    const user = users.find((u) => u.id === member.userId);
                    return {
                        name: member.name,
                        email: user?.email || "N/A",
                        phone: member.phone,
                        feePackage: feePackages.find((pkg) => pkg.id === member.feePackage)?.name || "N/A",
                        paymentAmount: bills.filter((bill) => bill.memberId === member.id).reduce((sum, bill) => sum + parseFloat(bill.amount), 0),
                    };
                })}
                headers={[
                    { label: "Name", key: "name" },
                    { label: "Email", key: "email" },
                    { label: "Phone", key: "phone" },
                    { label: "Fee Package", key: "feePackage" },
                    { label: "Total Payments", key: "paymentAmount" },
                ]}
                filename="members_payments.csv"
            >
                <button className="export-button">Export Data</button>
            </CSVLink>
        </div>
    );
};

export default Sidebar;