import { useParams, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/RoomDetails.css";

const rooms = {
  "deluxe-king": {
    name: "Deluxe King Room",
    category: "COMFORT & ELEGANCE",
    description:
      "A refined sanctuary designed for relaxation, comfort and an unforgettable stay. Enjoy elegant interiors, thoughtful amenities and a peaceful atmosphere.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=90",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "35 m²",
    price: "PKR 18,500",
    tag: "POPULAR CHOICE",
  },
  "executive-suite": {
    name: "Executive Suite",
    category: "REFINED LUXURY",
    description:
      "Experience elevated living with spacious interiors and sophisticated amenities. A perfect combination of privacy, elegance and exceptional comfort.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=90",
    guests: "2 Guests",
    bed: "1 King Bed",
    size: "55 m²",
    price: "PKR 32,000",
    tag: "EXCLUSIVE",
  },
  "presidential-suite": {
    name: "Presidential Suite",
    category: "ULTIMATE INDULGENCE",
    description:
      "The finest expression of luxury, offering exceptional space, premium interiors and complete privacy for an extraordinary stay.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=90",
    guests: "4 Guests",
    bed: "2 King Beds",
    size: "90 m²",
    price: "PKR 65,000",
    tag: "PREMIUM EXPERIENCE",
  },
};

function RoomDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const room = rooms[slug];

  if (!room) {
    return (
      <>
        <Navbar />
        <div className="room-not-found">
          <h1>Room Not Found</h1>
          <Link to="/">Return to Homepage</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="room-details-page">
        <section
          className="room-details-hero"
          style={{ backgroundImage: `url(${room.image})` }}
        >
          <div className="room-details-overlay"></div>

          <div className="room-details-hero-content">
            <p>{room.category}</p>
            <h1>{room.name}</h1>
            <span>{room.tag}</span>
          </div>
        </section>

        <section className="room-details-content">
          <div className="room-details-info">
            <p className="section-eyebrow">YOUR PRIVATE SANCTUARY</p>
            <h2>
              Experience <span>Exceptional Comfort</span>
            </h2>
            <p className="room-details-description">{room.description}</p>

            <div className="room-details-features">
              <div>
                <span>♙</span>
                <small>GUESTS</small>
                <strong>{room.guests}</strong>
              </div>

              <div>
                <span>♧</span>
                <small>BED TYPE</small>
                <strong>{room.bed}</strong>
              </div>

              <div>
                <span>◈</span>
                <small>ROOM SIZE</small>
                <strong>{room.size}</strong>
              </div>
            </div>
          </div>

          <aside className="room-details-booking">
            <p>YOUR STAY</p>
            <h3>{room.price}</h3>
            <span>Per night</span>
            <Link to={`/booking/${slug}`} state={location.state}>
              RESERVE THIS ROOM ↗
            </Link>
          </aside>
        </section>

        <div className="room-details-back">
          <Link to="/#rooms">← BACK TO ALL ROOMS</Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default RoomDetails;
