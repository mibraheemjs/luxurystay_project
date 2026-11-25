
import { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Rooms & Suites', href: '#rooms' },
        { name: 'Dining', href: '#dining' },
        { name: 'Experiences', href: '#experiences' },
        { name: 'About Us', href: '#about' }
    ];

    return (
        <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>

            <nav className="royal-navbar">

                {/* Logo */}
                <a href="#home" className="brand-logo" onClick={closeMenu}>
                    <span className="brand-name">LuxuryStay</span>
                    <span className="brand-subtitle">
                        HOTELS <span>✦</span> RESORTS
                    </span>
                </a>

                {/* Desktop Navigation */}
                <ul className="desktop-nav">
                    {navLinks.map((link, index) => (
                        <li
                            key={link.name}
                            style={{ '--delay': `${index * 0.12}s` }}
                        >
                            <a href={link.href}>
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Reservation Button */}
                <a href="#rooms" className="reserve-button">
                    <span>RESERVE YOUR STAY</span>
                    <span className="reserve-arrow">↗</span>
                </a>

                {/* Mobile Menu Toggle */}
                <button
                    className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                </button>

            </nav>

            {/* Mobile Navigation */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>

                <div className="mobile-menu-content">

                    <p className="mobile-menu-label">
                        DISCOVER LUXURYSTAY
                    </p>

                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={closeMenu}
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <span className="mobile-link-number">
                                0{index + 1}
                            </span>
                            {link.name}
                            <span className="mobile-link-arrow">↗</span>
                        </a>
                    ))}

                    <a
                        href="#rooms"
                        className="mobile-reserve"
                        onClick={closeMenu}
                    >
                        RESERVE YOUR STAY ↗
                    </a>

                    <p className="mobile-menu-footer">
                        AN EXPERIENCE BEYOND EXPECTATIONS
                    </p>

                </div>

            </div>

        </header>
    );
}

export default Navbar;
