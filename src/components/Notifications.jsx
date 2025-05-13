import React, { useState } from "react";

const Notifications = ({ sendNotification }) => {
    const [notification, setNotification] = useState("");

    const handleSendNotification = async () => {
        if (!notification.trim()) return;

        await sendNotification(notification);
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
