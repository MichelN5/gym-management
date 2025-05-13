import { sendNotification } from "../services/adminService";

export const useNotifications = () => {
    const sendNotificationHandler = async (message) => {
        try {
            await sendNotification(message);
            alert("Notification sent successfully!");
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    return { sendNotification: sendNotificationHandler };
};