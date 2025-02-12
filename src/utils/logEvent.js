import { db } from "../firebase"; // Ensure this points to your Firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const logEvent = async (eventType, message, userId = "Unknown") => {
    try {
        await addDoc(collection(db, "logs"), {
            event: eventType,
            message: message,
            userId: userId,
            timestamp: serverTimestamp(),
        });
        console.log(`[${eventType}] - ${message} (User ID: ${userId})`);
    } catch (error) {
        console.error("Error logging event:", error);
    }
};

export default logEvent;
