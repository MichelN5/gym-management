import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";
import Sidebar from "../components/Sidebar";
import FeePackages from "../components/FeePackages";
import Members from "../components/Members";
import Payments from "../components/Payments";
import Notifications from "../components/Notifications";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("feePackages");
    const [members, setMembers] = useState([]);
    const [feePackages, setFeePackages] = useState([]);
    const [bills, setBills] = useState([]);
    const [users, setUsers] = useState([]);

    // Fetch all data
    const fetchData = async () => {
        const membersSnapshot = await getDocs(collection(db, "members"));
        const packagesSnapshot = await getDocs(collection(db, "feePackages"));
        const billsSnapshot = await getDocs(collection(db, "bills"));
        const usersSnapshot = await getDocs(collection(db, "users"));

        setMembers(membersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setFeePackages(packagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setBills(billsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setUsers(usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <Sidebar
                setActiveSection={setActiveSection}
                members={members}
                bills={bills}
                feePackages={feePackages}
                users={users}
            />
            <div className="content">
                {activeSection === "feePackages" && (
                    <FeePackages
                        feePackages={feePackages}
                        addFeePackage={async (newPackage) => {
                            await addDoc(collection(db, "feePackages"), newPackage);
                            fetchData();
                        }}
                        deleteFeePackage={async (id) => {
                            await deleteDoc(doc(db, "feePackages", id));
                            fetchData();
                        }}
                    />
                )}
                {activeSection === "members" && (
                    <Members
                        members={members}
                        users={users}
                        feePackages={feePackages}
                        addMember={async (newMember) => {
                            await addDoc(collection(db, "members"), newMember);
                            fetchData();
                        }}
                        deleteMember={async (id) => {
                            await deleteDoc(doc(db, "members", id));
                            fetchData();
                        }}
                    />
                )}
                {activeSection === "payments" && (
                    <Payments
                        bills={bills}
                        members={members}
                        users={users}
                        createBill={async (newBill) => {
                            await addDoc(collection(db, "bills"), {
                                ...newBill,
                                status: "pending",
                                timestamp: new Date(),
                            });
                            fetchData();
                        }}
                        togglePaymentStatus={async (billId, currentStatus) => {
                            const newStatus = currentStatus === "pending" ? "paid" : "pending";
                            await updateDoc(doc(db, "bills", billId), { status: newStatus });
                            fetchData();
                        }}
                    />
                )}
                {activeSection === "notifications" && (
                    <Notifications
                        sendNotification={async (message) => {
                            await addDoc(collection(db, "notifications"), {
                                message,
                                timestamp: new Date(),
                            });
                            alert("Notification sent successfully!");
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;