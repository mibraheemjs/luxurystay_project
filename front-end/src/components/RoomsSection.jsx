
import { Link } from "react-router-dom";
import "./RoomsSection.css";

const rooms = [
  {
    id: 1,
    slug: "deluxe-king",
    category: "COMFORT & ELEGANCE",
    name: "Deluxe King Room",
    description:
      "A refined sanctuary designed for relaxation, comfort and an unforgettable stay.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "35 m²",
    price: "PKR 18,500",
    tag: "POPULAR CHOICE",
  },
  {
    id: 2,
    slug: "executive-suite",
    category: "REFINED LUXURY",
    name: "Executive Suite",
    description:
      "Experience elevated living with spacious interiors and sophisticated amenities.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "55 m²",
    price: "PKR 32,000",
    tag: "EXCLUSIVE",
  },
  {
    id: 3,
    slug: "presidential-suite",
    category: "ULTIMATE INDULGENCE",
    name: "Presidential Suite",
    description:
      "The finest expression of luxury, offering exceptional space and privacy.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    guests: "4 Guests",
    bed: "2 King Beds",
    size: "90 m²",
    price: "PKR 65,000",
    tag: "PREMIUM EXPERIENCE",
  },
];

function RoomsSection() {
  return (
    <section className="rooms-section" id="rooms">

      <div className="rooms-heading">
        <p className="section-eyebrow">ACCOMMODATION</p>

        <h2>
          Discover Our <span>Rooms & Suites</span>
        </h2>

        <p className="rooms-intro">
          Thoughtfully designed spaces, exceptional comfort and timeless
          elegance. Find the perfect stay for your next experience.
        </p>
      </div>

      <div className="rooms-grid">

        {rooms.map((room) => (
          <article className="room-card" key={room.id}>

            <div className="room-image-wrapper">

              <img
                src={room.image}
                alt={room.name}
                className="room-image"
                loading="lazy"
              />

              <span className="room-tag">{room.tag}</span>

              <Link
                to={`/rooms/${room.slug}`}
                className="room-image-link"
              >
                VIEW ROOM ↗
              </Link>

            </div>

            <div className="room-details">

              <p className="room-category">{room.category}</p>

              <h3>{room.name}</h3>

              <p className="room-description">
                {room.description}
              </p>

              <div className="room-features">
                <span>♙ {room.guests}</span>
                <span>♧ {room.bed}</span>
                <span>◈ {room.size}</span>
              </div>

              <div className="room-card-footer">

                <div className="room-price">
                  <small>STARTING FROM</small>
                  <strong>{room.price}</strong>
                  <span>/ night</span>
                </div>

                <Link
                  to={`/rooms/${room.slug}#booking`}
                  className="room-book-button"
                >
                  BOOK NOW ↗
                </Link>

              </div>

            </div>

          </article>
        ))}

      </div>

      <div className="rooms-footer">
        <a href="#rooms" className="view-all-rooms">
          EXPLORE ALL ACCOMMODATIONS ↗
        </a>
      </div>

    </section>
  );
}

export default RoomsSection;
