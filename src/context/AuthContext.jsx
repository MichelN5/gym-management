import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "../token";

const AuthContext = createContext({
    isAuthorized: false,
    user: null,
    login: () => { },
    logout: () => { },
    refreshToken: () => { },
    signUp: () => { }
});

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);

        if (token) {
            try {
                const decoded = jwtDecode(token);


                if (decoded.exp < Date.now() / 1000) {
                    await refreshToken();
                } else {

                    setIsAuthorized(true);
                    setUser(decoded);






                }
            } catch (error) {
                logout();
            }
        } else if (googleAccessToken) {
            try {
                const isValid = await validateGoogleToken(googleAccessToken);
                if (isValid) {
                    setIsAuthorized(true);
                } else {
                    logout();
                }
            } catch (error) {
                logout();
            }
        } else {
            logout();
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/api/token/refresh/', { refresh: refreshToken });

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                const decoded = jwtDecode(res.data.access);


                setIsAuthorized(true);
                setUser(decoded);
                return true;
            }
        } catch (error) {
            console.error('Token refresh failed', error);
            logout();
        }
        return false;
    };

    const validateGoogleToken = async (googleAccessToken) => {
        try {
            const res = await api.post('/api/google/validate_token/', {
                access_token: googleAccessToken,
            });
            return res.data.valid;
        } catch (error) {
            console.error('Google token validation failed', error);
            return false;
        }
    };

    const login = async (credentials) => {
        try {
            let res;
            if (credentials.google_token) {
                res = await api.post('/api/google/login/', { access_token: credentials.google_token });
            } else {
                res = await api.post('/api/token/', credentials);
            }

            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            if (res.data.refresh) {
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            }

            await checkAuth();
            return true;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    };

    const signUp = async (username, password) => {
        try {
            const res = await api.post('http://127.0.0.1:8000/api/user/register/', {
                username,
                password
            });

            if (res.status === 201) {
                return res.data; // Return user data or success response
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                throw new Error(error.response.data?.message || "Failed to create account.");
            } else if (error.request) {
                // Request was made but no response received
                throw new Error("No response from server. Please check your connection.");
            } else {
                // Other errors (e.g., coding errors)
                throw new Error("An unexpected error occurred.");
            }
        }
    };


    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
        setIsAuthorized(false);
        setUser(null);
    };

    useEffect(() => {
        checkAuth();

        const interval = setInterval(() => {
            checkAuth();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthorized,
            user,
            login,
            logout,
            refreshToken,
            signUp
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
