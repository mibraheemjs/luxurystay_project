import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./SearchResults.css";

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
    maxGuests: 2,
    bed: "1 King Bed",
    size: "35 m²",
    price: 18500,
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
    maxGuests: 2,
    bed: "1 King Bed",
    size: "55 m²",
    price: 32000,
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
    maxGuests: 4,
    bed: "2 King Beds",
    size: "90 m²",
    price: 65000,
    tag: "PREMIUM EXPERIENCE",
  },
];

function SearchResults() {
  const location = useLocation();

  const { checkIn, checkOut, guests } = location.state || {};

  if (!checkIn || !checkOut || !guests) {
    return (
      <>
        <Navbar />
        <div className="room-not-found">
          <h1>No Search Details Found</h1>
          <Link to="/">Return to Homepage</Link>
        </div>
        <Footer />
      </>
    );
  }

  const nights = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
  );

  // Filter rooms according to selected guests
  const guestCount = Number(guests);

  const filteredRooms = rooms.filter((room) => room.maxGuests >= guestCount);

  const formatPrice = (price) => "PKR " + price.toLocaleString("en-PK");

  return (
    <>
      <Navbar />

      <main className="search-results-page">
        <section className="search-results-heading">
          <p>YOUR LUXURY EXPERIENCE</p>
          <h1>
            Available <span>Rooms & Suites</span>
          </h1>
          <p>Find the perfect room for your stay.</p>
        </section>

        <section className="search-summary">
          <div>
            <small>CHECK IN</small>
            <strong>{checkIn}</strong>
          </div>

          <div>
            <small>CHECK OUT</small>
            <strong>{checkOut}</strong>
          </div>

          <div>
            <small>GUESTS</small>
            <strong>
              {guests} {guests === "1" ? "Guest" : "Guests"}
            </strong>
          </div>

          <div>
            <small>TOTAL NIGHTS</small>
            <strong>{nights} Nights</strong>
          </div>
        </section>

        {/* AVAILABLE ROOMS */}

        <section className="available-rooms">
          <div className="available-rooms-heading">
            <div>
              <p>EXPLORE YOUR OPTIONS</p>
              <h2>
                Choose Your <span>Perfect Stay</span>
              </h2>
            </div>

            <span>{filteredRooms.length} Room Options</span>
          </div>

          <div className="available-rooms-grid">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <article className="available-room-card" key={room.id}>
                  <div className="available-room-image">
                    <img src={room.image} alt={room.name} />
                    <span>{room.tag}</span>
                  </div>

                  <div className="available-room-info">
                    <p className="available-room-category">{room.category}</p>

                    <h3>{room.name}</h3>

                    <p className="available-room-description">
                      {room.description}
                    </p>

                    <div className="available-room-features">
                      <span>♙ {room.guests}</span>
                      <span>♧ {room.bed}</span>
                      <span>◈ {room.size}</span>
                    </div>

                    <div className="available-room-price">
                      <div>
                        <small>PRICE PER NIGHT</small>
                        <strong>{formatPrice(room.price)}</strong>
                      </div>

                      <div>
                        <small>TOTAL FOR {nights} NIGHTS</small>
                        <strong>{formatPrice(room.price * nights)}</strong>
                      </div>
                    </div>

                    <Link
                      to={`/rooms/${room.slug}`}
                      state={{ checkIn, checkOut, guests }}
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-rooms-found">
                <h3>No Suitable Rooms Found</h3>
                <p>
                  Sorry, we don't have rooms available for
                  {` ${guestCount} guests`}. Please try a different guest count.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default SearchResults;
