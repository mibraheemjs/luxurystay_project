
import './DiningSection.css';

const diningExperiences = [
    {
        id: 1,
        number: '01',
        category: 'SIGNATURE RESTAURANT',
        name: 'The Grand Table',
        description:
            'Discover exceptional international cuisine, thoughtfully prepared with the finest ingredients.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85',
        timing: '12:00 PM – 11:00 PM'
    },
    {
        id: 2,
        number: '02',
        category: 'LOUNGE & BAR',
        name: 'The Golden Lounge',
        description:
            'Unwind in an intimate atmosphere with handcrafted refreshments and impeccable service.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
        timing: '04:00 PM – 01:00 AM'
    },
    {
        id: 3,
        number: '03',
        category: 'PRIVATE DINING',
        name: 'The Private Collection',
        description:
            'Celebrate special moments with personalized menus and an exclusive dining experience.',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85',
        timing: 'By Reservation'
    }
];

function DiningSection() {
    return (
        <section className="dining-section" id="dining">

            {/* SECTION INTRO */}
            <div className="dining-heading">

                <p className="section-eyebrow">
                    A TASTE OF EXCELLENCE
                </p>

                <h2>
                    Fine Dining, <span>Elevated.</span>
                </h2>

                <p className="dining-intro">
                    An extraordinary culinary journey awaits.
                    Experience exceptional flavours, elegant
                    surroundings and unforgettable hospitality.
                </p>

            </div>

            {/* FEATURED DINING */}
            <div className="dining-feature">

                <div className="dining-feature-image">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=90"
                        alt="Luxury restaurant interior"
                    />
                </div>

                <div className="dining-feature-content">

                    <p className="feature-eyebrow">
                        THE ART OF FINE DINING
                    </p>

                    <h3>
                        Where Every Meal
                        <br />
                        Becomes a <span>Memory.</span>
                    </h3>

                    <p>
                        From carefully curated menus to exquisite
                        presentation, every detail is designed to
                        create a dining experience beyond the
                        ordinary.
                    </p>

                    <a href="#dining-experiences">
                        DISCOVER OUR EXPERIENCES ↗
                    </a>

                </div>

            </div>

            {/* DINING CARDS */}
            <div
                className="dining-experiences"
                id="dining-experiences"
            >

                <div className="dining-subheading">
                    <p className="section-eyebrow">
                        DISCOVER OUR VENUES
                    </p>

                    <h3>
                        Exceptional Experiences
                    </h3>
                </div>

                <div className="dining-grid">

                    {diningExperiences.map((experience) => (
                        <article
                            className="dining-card"
                            key={experience.id}
                        >

                            <div className="dining-card-image">
                                <img
                                    src={experience.image}
                                    alt={experience.name}
                                    loading="lazy"
                                />

                                <span className="dining-number">
                                    {experience.number}
                                </span>
                            </div>

                            <div className="dining-card-content">

                                <p className="dining-category">
                                    {experience.category}
                                </p>

                                <h4>{experience.name}</h4>

                                <p className="dining-description">
                                    {experience.description}
                                </p>

                                <div className="dining-card-bottom">

                                    <span>
                                        {experience.timing}
                                    </span>

                                    <a href="#contact">
                                        EXPLORE ↗
                                    </a>

                                </div>

                            </div>

                        </article>
                    ))}

                </div>

            </div>

            {/* FINAL CTA */}
            <div className="dining-cta">

                <p>AN EXPERIENCE WORTH SAVOURING</p>

                <h3>
                    Reserve Your <span>Table.</span>
                </h3>

                <a href="#contact">
                    MAKE A RESERVATION ↗
                </a>

            </div>

        </section>
    );
}

export default DiningSection;
