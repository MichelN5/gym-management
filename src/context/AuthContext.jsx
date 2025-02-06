import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null); // Add user role state

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
            // Step 1: Sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Step 2: Fetch the user's role from Firestore
            const role = await fetchUserRole(user.uid);

            // Step 3: Update the user and userRole state
            setUser(user);
            setUserRole(role);

            // Step 4: Return the user and role
            return { user, role };
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Clear the user state
            setUserRole(null); // Clear the userRole state
        } catch (error) {
            console.error("Error during logout:", error);
            throw error;
        }
    };

    // Sign-up function
    const signUp = async (email, password, role = "member") => {
        try {
            // Step 1: Create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Step 2: Store the user's role in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: role, // Store the role (default is "member")
            });

            // Step 3: Update the user and userRole state
            setUser(user);
            setUserRole(role);

            // Step 4: Return the user credentials and role
            return { user, role };
        } catch (error) {
            console.error("Error during registration:", error);
            throw error;
        }
    };

    // Google sign-in function
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Fetch or set the user's role (optional: you can set a default role for Google sign-ins)
            const role = await fetchUserRole(user.uid) || "member"; // Default to "member" if role is not set
            setUser(user);
            setUserRole(role);

            return { user, role };
        } catch (error) {
            console.error("Error during Google sign-in:", error);
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