import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookingPage.css";

const rooms = {
  "deluxe-king": {
    name: "Deluxe King Room",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85",
    price: 18500,
  },
  "executive-suite": {
    name: "Executive Suite",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85",
    price: 32000,
  },
  "presidential-suite": {
    name: "Presidential Suite",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    price: 65000,
  },
};

function BookingPage() {
  const { slug } = useParams();
  const location = useLocation();
  const room = rooms[slug];
  const navigate = useNavigate();

  const { checkIn, checkOut, guests } = location.state || {};

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

  if (!checkIn || !checkOut || !guests) {
    return (
      <>
        <Navbar />
        <div className="room-not-found">
          <h1>Booking Details Not Found</h1>
          <Link to="/">Please search for a stay first</Link>
        </div>
        <Footer />
      </>
    );
  }

  const nights = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
  );

  const totalPrice = room.price * nights;

  const formatPrice = (price) => "PKR " + price.toLocaleString("en-PK");

  const handleBooking = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const booking = {
      reference: "LS" + Date.now().toString().slice(-8),
      room: room.name,
      checkIn,
      checkOut,
      guests,
      nights,
      totalPrice,
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      status: "Confirmed (Demo)",
    };

    navigate("/booking-confirmation", {
      state: { booking },
    });
  };

  return (
    <>
      <Navbar />

      <main className="booking-page">
        <section className="booking-page-heading">
          <p>YOUR LUXURY EXPERIENCE</p>
          <h1>
            Complete Your <span>Reservation</span>
          </h1>
          <span>Just a few details before your stay begins.</span>
        </section>

        <div className="booking-layout">
          <section className="booking-form-section">
            <h2>Guest Information</h2>

            <form onSubmit={handleBooking}>
              <label>FULL NAME</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                required
              />

              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />

              <label>PHONE NUMBER</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                required
              />

              <button type="submit">CONFIRM DEMO BOOKING ↗</button>

              <p className="demo-notice">
                Demo booking only. No real reservation or payment will be
                processed.
              </p>
            </form>
          </section>

          <aside className="booking-summary-card">
            <img src={room.image} alt={room.name} />

            <div className="booking-summary-content">
              <p>YOUR SELECTED ROOM</p>
              <h2>{room.name}</h2>

              <div className="booking-summary-details">
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
                  <strong>{guests}</strong>
                </div>

                <div>
                  <small>DURATION</small>
                  <strong>{nights} Nights</strong>
                </div>
              </div>

              <div className="booking-price-row">
                <span>Price per night</span>
                <strong>{formatPrice(room.price)}</strong>
              </div>

              <div className="booking-price-row">
                <span>{nights} Nights</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              <div className="booking-total">
                <span>Total Amount</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BookingPage;
