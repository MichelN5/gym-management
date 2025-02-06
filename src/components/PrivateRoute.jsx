import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path

const PrivateRoute = ({ children, roleRequired }) => {
    const { user, userRole } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;

    }

    if (roleRequired && userRole !== roleRequired) {
        return <Navigate to="/" />; // Redirect to home or another page
    }

    return children;
};

export default PrivateRoute;