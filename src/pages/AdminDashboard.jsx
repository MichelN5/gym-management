import React, { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.js"; // Adjust the path to your Firebase config
import { CSVLink } from "react-csv"; // For exporting reports
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState({
        name: "",
        email: "",
        phone: "",
        feePackage: "",
    });
    const [notification, setNotification] = useState("");
    const [bill, setBill] = useState({ memberId: "", amount: "", description: "" });

    // Fetch all members from Firestore
    const fetchMembers = async () => {
        const querySnapshot = await getDocs(collection(db, "members"));
        const membersList = [];
        querySnapshot.forEach((doc) => {
            membersList.push({ id: doc.id, ...doc.data() });
        });
        setMembers(membersList);
    };

    // Add a new member to Firestore
    const addMember = async () => {
        if (!newMember.name || !newMember.email || !newMember.phone || !newMember.feePackage) {
            alert("Please fill all fields");
            return;
        }
        await addDoc(collection(db, "members"), newMember);
        setNewMember({ name: "", email: "", phone: "", feePackage: "" });
        fetchMembers(); // Refresh the list
    };

    // Update a member in Firestore
    const updateMember = async (id, updatedData) => {
        await updateDoc(doc(db, "members", id), updatedData);
        fetchMembers(); // Refresh the list
    };

    // Delete a member from Firestore
    const deleteMember = async (id) => {
        await deleteDoc(doc(db, "members", id));
        fetchMembers(); // Refresh the list
    };

    // Send a notification to all members
    const sendNotification = async () => {
        if (!notification) {
            alert("Please enter a notification message");
            return;
        }
        await addDoc(collection(db, "notifications"), {
            message: notification,
            timestamp: new Date(),
        });
        setNotification("");
        alert("Notification sent successfully!");
    };

    // Create a bill for a member
    const createBill = async () => {
        if (!bill.memberId || !bill.amount || !bill.description) {
            alert("Please fill all fields");
            return;
        }
        await addDoc(collection(db, "bills"), {
            memberId: bill.memberId,
            amount: bill.amount,
            description: bill.description,
            timestamp: new Date(),
        });
        setBill({ memberId: "", amount: "", description: "" });
        alert("Bill created successfully!");
    };

    // Export members data as CSV
    const exportMembers = () => {
        const headers = [
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Fee Package", key: "feePackage" },
        ];
        return (
            <CSVLink data={members} headers={headers} filename="members.csv">
                <button className="export-button">Export Members</button>
            </CSVLink>
        );
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <div className="container">
            {/* Top Navigation Bar */}
            <div className="top-nav">
                <h1>GYM Management System</h1>
                <button onClick={fetchMembers}>Refresh</button>
            </div>

            {/* Add Member Section */}
            <div className="card">
                <h2>Add New Member</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Fee Package"
                    value={newMember.feePackage}
                    onChange={(e) => setNewMember({ ...newMember, feePackage: e.target.value })}
                />
                <button onClick={addMember}>Add Member</button>
            </div>

            {/* Members List */}
            <div className="card">
                <h2>Members List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Fee Package</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.phone}</td>
                                <td>{member.feePackage}</td>
                                <td>
                                    <button onClick={() => updateMember(member.id, { feePackage: "Updated Package" })}>
                                        Update
                                    </button>
                                    <button onClick={() => deleteMember(member.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Send Notification Section */}
            <div className="card notification-section">
                <h2>Send Notification</h2>
                <textarea
                    placeholder="Enter notification message"
                    value={notification}
                    onChange={(e) => setNotification(e.target.value)}
                />
                <button onClick={sendNotification}>Send Notification</button>
            </div>

            {/* Create Bill Section */}
            <div className="card bill-section">
                <h2>Create Bill</h2>
                <select
                    value={bill.memberId}
                    onChange={(e) => setBill({ ...bill, memberId: e.target.value })}
                >
                    <option value="">Select Member</option>
                    {members.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Amount"
                    value={bill.amount}
                    onChange={(e) => setBill({ ...bill, amount: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={bill.description}
                    onChange={(e) => setBill({ ...bill, description: e.target.value })}
                />
                <button onClick={createBill}>Create Bill</button>
            </div>

            {/* Export Members Section */}
            <div className="card">
                <h2>Export Members</h2>
                {exportMembers()}
            </div>
        </div>
    );
};

export default AdminDashboard;