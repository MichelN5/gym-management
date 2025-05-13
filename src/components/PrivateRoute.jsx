import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path based on your structure

const PrivateRoute = ({ children }) => {
    const { user, isAuthorized } = useAuth();
    if (!isAuthorized) {
        return <Navigate to="/login" />;
    }




    return children;
};

export default PrivateRoute;
