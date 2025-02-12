import React, { useState } from "react";
import logEvent from "../utils/logEvent"; // Import logging utility
import { auth } from "../firebase"; // Import Firebase auth

const Notifications = ({ sendNotification }) => {
    const [notification, setNotification] = useState("");

    const handleSendNotification = async () => {
        if (!notification.trim()) return;

        await sendNotification(notification);
        const userId = auth.currentUser ? auth.currentUser.uid : "Unknown User";

        await logEvent(
            "SEND_NOTIFICATION",
            `Notification sent: "${notification}"`,
            userId
        );

        setNotification(""); // Clear input after sending
    };

    return (
        <div className="card notification-section">
            <h2>Send Notification</h2>
            <textarea
                placeholder="Enter notification message"
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
            />
            <button onClick={handleSendNotification}>Send Notification</button>
        </div>
    );
};

export default Notifications;
