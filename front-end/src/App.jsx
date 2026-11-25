import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ExperienceSection from "./components/ExperiencesSection";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import heroImage from "./assets/try_hero.jpg";
import RoomsSection from "./components/RoomsSection";
import DiningSection from "./components/DiningSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import SearchResults from "./pages/SearchResults";
import RoomDetails from "./pages/RoomDetails";
import BookingPage from "./pages/BookingPage";
import BookingConfirmation from "./pages/BookingConfirmation";

import "./index.css";

function HomePage() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="hero-section"
        id="home"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="hero-subtitle">WELCOME TO LUXURYSTAY</p>

          <h1>
            Where Luxury
            <br />
            Meets <span>Elegance.</span>
          </h1>

          <p className="hero-description">
            Discover a world of refined comfort, timeless elegance and
            unforgettable hospitality.
          </p>

          <a href="#rooms" className="hero-button">
            DISCOVER OUR ROOMS <span>↗</span>
          </a>
        </div>

        <div className="hero-bottom">
          <span>EXPERIENCE THE EXTRAORDINARY</span>
          <span>01 — 05</span>
        </div>

        <div className="hero-scroll">
          <span></span>
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* BOOKING SEARCH */}
      <section className="booking-wrapper" id="booking">
        <form
          className="booking-bar"
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);

            const checkIn = formData.get("checkIn");
            const checkOut = formData.get("checkOut");
            const guests = formData.get("guests");

            if (new Date(checkOut) <= new Date(checkIn)) {
              alert("Check-out date must be after check-in date.");
              return;
            }

            navigate("/search-results", {
              state: {
                checkIn,
                checkOut,
                guests,
              },
            });
          }}
        >
          <div className="booking-field">
            <label>CHECK IN</label>
            <input
              type="date"
              name="checkIn"
              min={new Date().toLocaleDateString("en-CA")}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setCheckOut("");
              }}
              required
            />
          </div>

          <div className="booking-divider"></div>

          <div className="booking-field">
            <label>CHECK OUT</label>
            <input
              type="date"
              name="checkOut"
              min={checkIn || new Date().toLocaleDateString("en-CA")}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>

          <div className="booking-divider"></div>

          <div className="booking-field">
            <label>GUESTS</label>
            <select name="guests" defaultValue="2">
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>

          <button type="submit" className="booking-submit">
            FIND YOUR STAY <span>↗</span>
          </button>
        </form>
      </section>

      <RoomsSection />
      <DiningSection />
      <ExperienceSection />
      <AboutSection />
      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/rooms/:slug" element={<RoomDetails />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/booking/:slug" element={<BookingPage />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
    </Routes>
  );
}

export default App;
