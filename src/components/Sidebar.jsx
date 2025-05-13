import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth to access the logout function

const Sidebar = ({ setActiveSection, members = [], bills = [], feePackages = [], users = [] }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth(); // Destructure logout from useAuth

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
            {isMobile && (
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? "✕" : "☰"}
                </button>
            )}

            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <h2>GYM Management</h2>

                <ul>
                    <li onClick={() => { setActiveSection("feePackages"); isMobile && setSidebarOpen(false); }}>
                        Fee Packages
                    </li>
                    <li onClick={() => { setActiveSection("members"); isMobile && setSidebarOpen(false); }}>
                        Members
                    </li>
                    <li onClick={() => { setActiveSection("payments"); isMobile && setSidebarOpen(false); }}>
                        Payments
                    </li>
                    <li onClick={() => { setActiveSection("notifications"); isMobile && setSidebarOpen(false); }}>
                        Notifications
                    </li>
                </ul>

                {/* Logout button */}
                <button
                    className="logout-button"
                    onClick={() => { logout(); isMobile && setSidebarOpen(false); }}
                >
                    Logout
                </button>
            </div>
        </>
    );
};

export default Sidebar;
