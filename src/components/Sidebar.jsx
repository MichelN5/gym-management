import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const Sidebar = ({ setActiveSection, members, bills, feePackages, users }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Check screen size on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
            if (window.innerWidth > 1024) setSidebarOpen(true);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <>
            {/* Mobile Menu Toggle */}
            {isMobile && (
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? "✕" : "☰"}
                </button>
            )}

            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <h2>GYM Management</h2>

                <ul>
                    <li onClick={() => {
                        setActiveSection("feePackages");
                        isMobile && setSidebarOpen(false);
                    }}>
                        Fee Packages
                    </li>
                    <li onClick={() => {
                        setActiveSection("members");
                        isMobile && setSidebarOpen(false);
                    }}>
                        Members
                    </li>
                    <li onClick={() => {
                        setActiveSection("payments");
                        isMobile && setSidebarOpen(false);
                    }}>
                        Payments
                    </li>
                    <li onClick={() => {
                        setActiveSection("notifications");
                        isMobile && setSidebarOpen(false);
                    }}>
                        Notifications
                    </li>
                </ul>

                <CSVLink
                    data={members.map((member) => ({
                        name: member.name,
                        email: users.find(u => u.id === member.userId)?.email || "N/A",
                        phone: member.phone,
                        feePackage: feePackages.find(pkg => pkg.id === member.feePackage)?.name || "N/A",
                        paymentAmount: bills.filter(bill => bill.memberId === member.id)
                            .reduce((sum, bill) => sum + parseFloat(bill.amount), 0),
                    }))}
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
        </>
    );
};

export default Sidebar;