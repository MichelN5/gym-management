import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, signInWithGoogle, userRole } = useAuth(); // Add userRole from AuthContext
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { role } = await login(email, password); // Get the role from login

            // Redirect based on role
            if (role === "admin") {
                navigate("/admin"); // Redirect to Admin Dashboard
            } else {
                navigate("/dashboard"); // Redirect to Member Dashboard
            }
        } catch (error) {
            setError("Invalid credentials. Please try again.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { role } = await signInWithGoogle(); // Get the role from Google sign-in

            // Redirect based on role
            if (role === "admin") {
                navigate("/admin"); // Redirect to Admin Dashboard
            } else {
                navigate("/dashboard"); // Redirect to Member Dashboard
            }
        } catch (error) {
            setError(error.message || "Failed to sign in with Google. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="card-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your Gym Dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email Address</label>
                        <span className="input-icon">✉</span>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <span className="input-icon">🔒</span>
                    </div>

                    <button type="submit" className="primary-btn">
                        Sign In
                    </button>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <button
                        type="button"
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <svg className="google-icon" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>
                </form>

                <div className="card-footer">
                    <p>Don't have an account? <a href="/signup">Create account</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;