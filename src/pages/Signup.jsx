import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { signUp, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Check if passwords are empty
        if (!password || !confirmPassword) {
            setError("Please enter a password and confirm it");
            return;
        }

        try {
            await signUp(email, password); // Use the correct function name
            navigate("/dashboard"); // Redirect to dashboard after successful signup
        } catch (error) {
            // Display specific Firebase error messages
            setError(error.message || "Failed to create account. Please try again.");
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await signInWithGoogle(); // Use the Google sign-in function
            navigate("/dashboard"); // Redirect to dashboard after successful sign-in
        } catch (error) {
            setError(error.message || "Failed to sign in with Google. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="card-header">
                    <h1>Create Your Account</h1>
                    <p>Join our gym management system</p>
                </div>

                <form onSubmit={handleSignup} className="login-form">
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

                    <div className="input-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <span className="input-icon">🔒</span>
                    </div>

                    <button type="submit" className="primary-btn">
                        Create Account
                    </button>

                    <div className="divider">
                        <span>Or sign up with</span>
                    </div>

                    <button
                        type="button"
                        className="google-btn"
                        onClick={handleGoogleSignup}
                        aria-label="Continue with Google"
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
                    <p>Already have an account? <a href="/login">Sign in</a></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;