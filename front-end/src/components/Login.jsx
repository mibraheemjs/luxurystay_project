
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Backend authentication will be connected later.
    };

    return (
        <section className="login-page">
            <div className="login-image">
                <div className="login-image-content">
                    <span>WELCOME TO LUXURYSTAY</span>
                    <h1>Where Every Stay Becomes A Memory.</h1>
                    <p>
                        Experience exceptional hospitality and
                        discover a world of comfort.
                    </p>
                </div>
            </div>

            <div className="login-form-container">
                <div className="login-form">
                    <Link to="/" className="login-logo">
                        LUXURY<span>STAY</span>
                    </Link>

                    <span className="login-eyebrow">
                        WELCOME BACK
                    </span>

                    <h2>Sign In</h2>
                    <p className="login-subtitle">
                        Enter your details to access your account.
                    </p>

                    <form onSubmit={handleLogin}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                        />

                        <label>Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="login-options">
                            <label className="remember-option">
                                <input type="checkbox" />
                                Remember me
                            </label>

                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className="login-submit">
                            SIGN IN
                        </button>
                    </form>

                    <p className="login-register">
                        Don't have an account?
                        <Link to="/register"> Create Account</Link>
                    </p>

                    <Link to="/" className="back-home">
                        ← Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Login;
