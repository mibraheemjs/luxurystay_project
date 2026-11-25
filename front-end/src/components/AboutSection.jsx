
import React from "react";
import "./AboutSection.css";

function AboutSection() {
    return (
        <section className="about-section" id="about">

            <div className="about-container">

                <div className="about-image">
                    <img
                        src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85"
                        alt="Luxury hotel interior"
                    />

                    <div className="about-image-label">
                        <span>THE LUXURYSTAY EXPERIENCE</span>
                    </div>
                </div>

                <div className="about-content">
                    <span className="about-eyebrow">
                        OUR STORY
                    </span>

                    <h2>
                        Hospitality With
                        <br />
                        <span>A Personal Touch.</span>
                    </h2>

                    <p className="about-intro">
                        At LuxuryStay, we believe that exceptional
                        hospitality is about more than just a beautiful
                        place to stay. It is about creating moments
                        that make every guest feel special.
                    </p>

                    <p className="about-description">
                        From thoughtfully designed spaces to attentive
                        service, every detail is carefully considered
                        to make your experience comfortable, memorable
                        and truly exceptional.
                    </p>

                    <div className="about-values">
                        <div className="about-value">
                            <span className="about-value-number">01</span>
                            <div>
                                <h4>Exceptional Comfort</h4>
                                <p>Spaces designed around your comfort.</p>
                            </div>
                        </div>

                        <div className="about-value">
                            <span className="about-value-number">02</span>
                            <div>
                                <h4>Thoughtful Hospitality</h4>
                                <p>Personal attention in every interaction.</p>
                            </div>
                        </div>
                    </div>

                    <a href="#contact" className="about-button">
                        GET IN TOUCH <span>↗</span>
                    </a>
                </div>

            </div>

            <div className="about-bottom">
                <span>MORE THAN A STAY.</span>
                <span>A FEELING TO REMEMBER.</span>
            </div>

        </section>
    );
}

export default AboutSection;
