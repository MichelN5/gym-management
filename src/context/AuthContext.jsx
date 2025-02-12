import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.js";
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

import logEvent from "../utils/logEvent"; // Import logging utility

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    // Fetch user role from Firestore
    const fetchUserRole = async (uid) => {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            return userDoc.data().role;
        }
        return null;
    };

    // Login function
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const role = await fetchUserRole(user.uid);
            setUser(user);
            setUserRole(role);
            await logEvent("LOGIN", "User logged in successfully", user.uid);
            return { user, role };
        } catch (error) {
            console.error("Error during login:", error);
            await logEvent("LOGIN_ERROR", error.message);
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setUserRole(null);
            await logEvent("LOGOUT", "User logged out successfully");
        } catch (error) {
            console.error("Error during logout:", error);
            await logEvent("LOGOUT_ERROR", error.message);
            throw error;
        }
    };

    // Sign-up function
    const signUp = async (email, password, role = "member") => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: role,
            });
            setUser(user);
            setUserRole(role);
            await logEvent("SIGNUP", "User signed up successfully", user.uid);
            return { user, role };
        } catch (error) {
            console.error("Error during registration:", error);
            await logEvent("SIGNUP_ERROR", error.message);
            throw error;
        }
    };

    // Google sign-in function
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const role = await fetchUserRole(user.uid) || "member";
            setUser(user);
            setUserRole(role);

            // Create user document if it doesn't exist
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    email: user.email,
                    role: role,
                });
            }

            await logEvent("GOOGLE_LOGIN", "User logged in with Google successfully", user.uid);
            return { user, role };
        } catch (error) {
            console.error("Error during Google sign-in:", error);
            await logEvent("GOOGLE_LOGIN_ERROR", error.message);
            throw error;
        }
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const role = await fetchUserRole(user.uid);
                setUser(user);
                setUserRole(role);
            } else {
                setUser(null);
                setUserRole(null);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, userRole, login, logout, signUp, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;