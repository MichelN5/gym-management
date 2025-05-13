import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import FeePackages from "../components/FeePackages";
import Members from "../components/Members";
import Payments from "../components/Payments";
import Notifications from "../components/Notifications";
import "../css/AdminDashboard.css";
import { usePayments } from "../hooks/usePayments";
import { useNotifications } from "../hooks/useNotifications";
import { useUsers } from "../hooks/useUsers";
import { fetchMembersAsync } from "../slices/membersSlice";

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("feePackages");

    const { bills, createBill, togglePaymentStatus } = usePayments();
    const { sendNotification } = useNotifications();
    const { users } = useUsers();

    const dispatch = useDispatch();
    const members = useSelector((state) => state.members.members);

    useEffect(() => {
        dispatch(fetchMembersAsync());
    }, [dispatch]);

    const renderSection = () => {
        switch (activeSection) {
            case "feePackages":
                return <FeePackages />;
            case "members":
                return (
                    <Members
                        members={members}
                        users={users}
                        feePackages={[]}
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
            />
            <div className="content">{renderSection()}</div>
        </div>
    );
};

export default AdminDashboard;
