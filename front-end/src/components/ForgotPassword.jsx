
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Password reset functionality will be connected with backend later.
        setMessage("Password reset functionality will be available soon.");
    };

    return (
        <section className="forgot-page">

            <div className="forgot-image">
                <div className="forgot-image-content">
                    <span>LUXURYSTAY ACCOUNT SUPPORT</span>

                    <h1>
                        A Fresh Start
                        <br />
                        Begins Here.
                    </h1>

                    <p>
                        Don't worry. We'll help you get back to
                        your LuxuryStay account.
                    </p>
                </div>
            </div>

            <div className="forgot-form-container">
                <div className="forgot-form">

                    <Link to="/" className="forgot-logo">
                        LUXURY<span>STAY</span>
                    </Link>

                    <span className="forgot-eyebrow">
                        ACCOUNT RECOVERY
                    </span>

                    <h2>Forgot Password?</h2>

                    <p className="forgot-subtitle">
                        Enter the email address associated with your
                        account. We'll help you reset your password.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            className="forgot-submit"
                        >
                            RESET PASSWORD
                        </button>

                    </form>

                    {message && (
                        <p className="forgot-message">
                            {message}
                        </p>
                    )}

                    <Link to="/login" className="forgot-back">
                        ← Back to Sign In
                    </Link>

                    <Link to="/" className="forgot-home">
                        Back to Homepage
                    </Link>

                </div>
            </div>

        </section>
    );
}

export default ForgotPassword;
