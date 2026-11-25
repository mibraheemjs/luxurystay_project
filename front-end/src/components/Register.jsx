
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        // Backend registration will be connected later.
    };

    return (
        <section className="register-page">

            <div className="register-image">
                <div className="register-image-content">
                    <span>BEGIN YOUR JOURNEY</span>
                    <h1>Experience Luxury Like Never Before.</h1>
                    <p>
                        Create your account and discover a more
                        personal way to experience hospitality.
                    </p>
                </div>
            </div>

            <div className="register-form-container">
                <div className="register-form">

                    <Link to="/" className="register-logo">
                        LUXURY<span>STAY</span>
                    </Link>

                    <span className="register-eyebrow">
                        JOIN LUXURYSTAY
                    </span>

                    <h2>Create Account</h2>

                    <p className="register-subtitle">
                        Fill in your details to get started.
                    </p>

                    <form onSubmit={handleRegister}>

                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            required
                        />

                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                        />

                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            required
                        />

                        <label>Password</label>
                        <div className="register-password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                required
                                minLength="6"
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

                        <label>Confirm Password</label>
                        <div className="register-password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                required
                                minLength="6"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <label className="register-terms">
                            <input type="checkbox" required />
                            <span>
                                I agree to the Terms & Conditions.
                            </span>
                        </label>

                        <button
                            type="submit"
                            className="register-submit"
                        >
                            CREATE ACCOUNT
                        </button>

                    </form>

                    <p className="register-login">
                        Already have an account?
                        <Link to="/login"> Sign In</Link>
                    </p>

                    <Link to="/" className="register-back-home">
                        ← Back to Homepage
                    </Link>

                </div>
            </div>

        </section>
    );
}

export default Register;
