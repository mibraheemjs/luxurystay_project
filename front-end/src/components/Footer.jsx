
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="luxury-footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h2>Luxury<span>Stay</span></h2>
          <p>
            Experience timeless elegance and exceptional
            hospitality. Discover a world of comfort,
            luxury and unforgettable moments.
          </p>

          <div className="footer-location">
            <span>⌖</span>
            <p>Karachi, Pakistan</p>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-column">
          <h3>Explore</h3>
          <a href="#rooms">Our Rooms</a>
          <a href="#dining">Dining</a>
          <a href="#experiences">Experiences</a>
          <a href="#about">About Us</a>
        </div>

        {/* Useful Links */}
        <div className="footer-column">
          <h3>Useful Links</h3>
          <a href="#booking">Online Reservation</a>
          <a href="#facilities">Facilities</a>
          <a href="#blog">Blog & News</a>
          <a href="#contact">Contact Us</a>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h3>Get In Touch</h3>
          <a href="mailto:info@luxurystay.com">
            info@luxurystay.com
          </a>
          <a href="tel:+920000000000">
            +92 000 0000000
          </a>
          <p>Karachi, Pakistan</p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="YouTube">YT</a>
          </div>
        </div>

      </div>

      {/* Accreditation & Newsletter */}
      <div className="footer-middle">
        <div className="footer-accreditation">
          <span className="accreditation-icon">✦</span>
          <div>
            <h4>EXCELLENCE IN HOSPITALITY</h4>
            <p>Committed to exceptional experiences</p>
          </div>
        </div>

        <div className="footer-newsletter">
          <div>
            <h3>Stay Connected</h3>
            <p>Subscribe for exclusive updates and offers.</p>
          </div>

          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              required
            />
            <button type="submit">Subscribe →</button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} LuxuryStay.
          All Rights Reserved.
        </p>

        <div className="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
