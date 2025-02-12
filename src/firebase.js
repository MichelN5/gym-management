// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function logEvent(eventType, message, userId = "Unknown") {
    try {
        await addDoc(collection(db, "logs"), {
            event: eventType,
            message: message,
            userId: userId,
            timestamp: serverTimestamp()
        });
        console.log("Log recorded:", eventType);
    } catch (error) {
        console.error("Error logging event:", error);
    }
}


const firebaseConfig = {
    apiKey: "AIzaSyBQaYbKAkWT_di0UlegNKFGHculqjOsinE",
    authDomain: "gym-management-3954d.firebaseapp.com",
    projectId: "gym-management-3954d",
    storageBucket: "gym-management-3954d.firebasestorage.app",
    messagingSenderId: "288442253647",
    appId: "1:288442253647:web:51737d41c1d48e69d4853a",
    measurementId: "G-4TF7L6GEWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);