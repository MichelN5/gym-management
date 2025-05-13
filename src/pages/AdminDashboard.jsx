import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import FeePackages from "../components/FeePackages";
import Members from "../components/Members";
import Payments from "../components/Payments";
import Notifications from "../components/Notifications";
import "../css/AdminDashboard.css";
import { useFeePackages } from "../hooks/useFeePackages";
import { useMembers } from "../hooks/useMembers";
import { usePayments } from "../hooks/usePayments";
import { useNotifications } from "../hooks/useNotifications";
import { useUsers } from "../hooks/useUsers"; // Add a hook to fetch users

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("feePackages");

    const { feePackages, addPackage, deletePackage } = useFeePackages();
    const { members, addMember, deleteMember, editMember } = useMembers();
    const { bills, createBill, togglePaymentStatus } = usePayments();
    const { sendNotification } = useNotifications();
    const { users } = useUsers(); // Fetch the list of users

    const renderSection = () => {
        switch (activeSection) {
            case "feePackages":
                return (
                    <FeePackages
                        feePackages={feePackages}
                        addFeePackage={addPackage}
                        deleteFeePackage={deletePackage}
                    />
                );
            case "members":
                return (
                    <Members
                        members={members}
                        users={users} // Pass the users prop here
                        addMember={addMember}
                        deleteMember={deleteMember}
                        editMember={editMember}
                        feePackages={feePackages}
                    />
                );
            case "payments":
                return (
                    <Payments
                        bills={bills}
                        members={members}
                        createBill={createBill}
                        togglePaymentStatus={togglePaymentStatus}
                    />
                );
            case "notifications":
                return <Notifications sendNotification={sendNotification} />;
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <Sidebar
                setActiveSection={setActiveSection}
                members={members}
                bills={bills}
                feePackages={feePackages}
            />
            <div className="content">{renderSection()}</div>
        </div>
    );
};

export default AdminDashboard;
