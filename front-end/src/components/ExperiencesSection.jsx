
import React from "react";
import "./ExperiencesSection.css";

const experiences = [
    {
        number: "01",
        category: "Wellness & Relaxation",
        title: "The Serenity Spa",
        description:
            "Unwind with rejuvenating treatments, soothing therapies and a peaceful atmosphere designed to refresh your senses.",
        image:
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85",
        link: "#contact",
    },
    {
        number: "02",
        category: "Leisure & Lifestyle",
        title: "Infinity Pool",
        description:
            "Escape into calm waters and enjoy a refreshing swim with a relaxing atmosphere throughout the day.",
        image:
            "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1000&q=85",
        link: "#contact",
    },
    {
        number: "03",
        category: "Exclusive Occasions",
        title: "Private Celebrations",
        description:
            "Make every occasion memorable with elegant settings, thoughtful service and beautifully arranged experiences.",
        image:
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85",
        link: "#contact",
    },
];

function ExperiencesSection() {
    return (
        <section className="experiences-section" id="experiences">

            <div className="experiences-heading">
                <span className="experiences-eyebrow">
                    BEYOND YOUR STAY
                </span>

                <h2>
                    Experiences That <span>Inspire.</span>
                </h2>

                <p>
                    Discover moments of relaxation, recreation and
                    celebration, thoughtfully created to make your stay
                    truly exceptional.
                </p>
            </div>

            <div className="experiences-feature">
                <div className="experiences-feature-image">
                    <img
                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=85"
                        alt="Luxury hotel swimming pool"
                    />
                </div>

                <div className="experiences-feature-content">
                    <span className="experiences-eyebrow">
                        A WORLD OF COMFORT
                    </span>

                    <h3>
                        Every Moment,
                        <br />
                        <span>Worth Remembering.</span>
                    </h3>

                    <p>
                        From peaceful escapes to unforgettable celebrations,
                        LuxuryStay brings together exceptional spaces and
                        experiences for every kind of traveller.
                    </p>

                    <a href="#experience-list" className="experiences-link">
                        DISCOVER MORE <span>↗</span>
                    </a>
                </div>
            </div>

            <div className="experiences-list" id="experience-list">
                <div className="experiences-subheading">
                    <div>
                        <span className="experiences-eyebrow">
                            CURATED FOR YOU
                        </span>
                        <h3>Explore Our Experiences</h3>
                    </div>

                    <p>
                        Find your perfect way to relax, enjoy and celebrate.
                    </p>
                </div>

                <div className="experiences-grid">
                    {experiences.map((experience) => (
                        <article
                            className="experience-card"
                            key={experience.number}
                        >
                            <div className="experience-image">
                                <img
                                    src={experience.image}
                                    alt={experience.title}
                                />

                                <span className="experience-number">
                                    {experience.number}
                                </span>
                            </div>

                            <div className="experience-content">
                                <span className="experience-category">
                                    {experience.category}
                                </span>

                                <h4>{experience.title}</h4>

                                <p>{experience.description}</p>

                                <a href={experience.link}>
                                    EXPLORE EXPERIENCE <span>↗</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

        </section>
    );
}

export default ExperiencesSection;
