
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookingConfirmation.css";

function BookingConfirmation() {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <>
        <Navbar />

        <div className="confirmation-not-found">
          <h1>Booking Details Not Found</h1>
          <p>Please complete your booking first.</p>
          <Link to="/">Return to Homepage</Link>
        </div>

        <Footer />
      </>
    );
  }

  const formatPrice = (price) =>
    "PKR " + Number(price).toLocaleString("en-PK");

  return (
    <>
      <Navbar />

      <main className="confirmation-page">
        <section className="confirmation-header">
          <div className="confirmation-icon">✓</div>

          <p className="confirmation-eyebrow">
            LUXURYSTAY RESERVATIONS
          </p>

          <h1>
            Booking <span>Confirmed!</span>
          </h1>

          <p>
            Thank you for choosing LuxuryStay.
            Your reservation details are below.
          </p>
        </section>

        <section className="confirmation-card">
          <div className="confirmation-reference">
            <div>
              <small>BOOKING REFERENCE</small>
              <h2>{booking.reference}</h2>
            </div>

            <span>{booking.status}</span>
          </div>

          <div className="confirmation-divider"></div>

          <div className="confirmation-section">
            <h3>Guest Information</h3>

            <div className="confirmation-grid">
              <div>
                <small>FULL NAME</small>
                <strong>{booking.fullName}</strong>
              </div>

              <div>
                <small>EMAIL ADDRESS</small>
                <strong>{booking.email}</strong>
              </div>

              <div>
                <small>PHONE NUMBER</small>
                <strong>{booking.phone}</strong>
              </div>
            </div>
          </div>

          <div className="confirmation-divider"></div>

          <div className="confirmation-section">
            <h3>Reservation Details</h3>

            <div className="confirmation-grid">
              <div>
                <small>SELECTED ROOM</small>
                <strong>{booking.room}</strong>
              </div>

              <div>
                <small>CHECK IN</small>
                <strong>{booking.checkIn}</strong>
              </div>

              <div>
                <small>CHECK OUT</small>
                <strong>{booking.checkOut}</strong>
              </div>

              <div>
                <small>GUESTS</small>
                <strong>{booking.guests}</strong>
              </div>

              <div>
                <small>DURATION</small>
                <strong>{booking.nights} Nights</strong>
              </div>
            </div>
          </div>

          <div className="confirmation-divider"></div>

          <div className="confirmation-total">
            <div>
              <small>TOTAL AMOUNT</small>
              <h2>{formatPrice(booking.totalPrice)}</h2>
            </div>

            <span>Demo Reservation</span>
          </div>
        </section>

        <div className="confirmation-footer">
          <p>
            This is a demo reservation. No actual booking or payment
            has been processed.
          </p>

          <Link to="/" className="confirmation-home-button">
            RETURN TO HOMEPAGE ↗
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BookingConfirmation;
