
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
    const [activeTab, setActiveTab] = useState('Overview');

    const menuItems = [
        { name: 'Overview', icon: '⌂' },
        { name: 'My Bookings', icon: '▣' },
        { name: 'My Profile', icon: '♙' },
    ];

    const bookings = [
        {
            id: '#LS-1024',
            room: 'Deluxe Ocean Suite',
            date: '12 Nov 2026 - 15 Nov 2026',
            guests: '2 Guests',
            price: '$450',
            status: 'Confirmed',
        },
        {
            id: '#LS-1025',
            room: 'Executive King Room',
            date: '20 Nov 2026 - 22 Nov 2026',
            guests: '1 Guest',
            price: '$280',
            status: 'Pending',
        },
    ];

    return (
        <div className="dashboard-container">

            {/* SIDEBAR */}
            <aside className="dashboard-sidebar">

                <Link to="/" className="dashboard-logo">
                    LUXURY<span>STAY</span>
                    <small>HOTEL & RESORT</small>
                </Link>

                <div className="sidebar-welcome">
                    <p>WELCOME BACK</p>
                    <h3>Guest User</h3>
                </div>

                <nav className="dashboard-menu">
                    <p className="menu-heading">MENU</p>

                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            className={
                                activeTab === item.name
                                    ? 'dashboard-menu-item active'
                                    : 'dashboard-menu-item'
                            }
                            onClick={() => setActiveTab(item.name)}
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <Link to="/" className="back-home">
                        ← Back to Website
                    </Link>

                    <Link to="/login" className="logout-button">
                        ↪ Logout
                    </Link>
                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="dashboard-main">

                <header className="dashboard-header">
                    <div>
                        <p className="dashboard-date">LUXURYSTAY / ACCOUNT</p>
                        <h1>
                            {activeTab === 'Overview'
                                ? 'Dashboard Overview'
                                : activeTab}
                        </h1>
                    </div>

                    <div className="dashboard-user">
                        <div className="user-avatar">G</div>
                        <div>
                            <h4>Guest User</h4>
                            <p>Member</p>
                        </div>
                    </div>
                </header>

                {/* OVERVIEW */}
                {activeTab === 'Overview' && (
                    <>
                        <section className="dashboard-welcome">
                            <div>
                                <p>YOUR LUXURY EXPERIENCE</p>
                                <h2>Welcome back, Guest!</h2>
                                <span>
                                    Manage your stays and enjoy a seamless
                                    hotel experience with LuxuryStay.
                                </span>
                            </div>

                            <div className="welcome-decoration">✦</div>
                        </section>

                        <section className="dashboard-stats">

                            <div className="stat-card">
                                <div className="stat-icon">▣</div>
                                <p>Total Bookings</p>
                                <h2>02</h2>
                                <span>All your reservations</span>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">✓</div>
                                <p>Confirmed Bookings</p>
                                <h2>01</h2>
                                <span>Successfully confirmed</span>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">◷</div>
                                <p>Pending Bookings</p>
                                <h2>01</h2>
                                <span>Awaiting confirmation</span>
                            </div>

                        </section>

                        <section className="dashboard-section">

                            <div className="section-heading">
                                <div>
                                    <p>YOUR RESERVATIONS</p>
                                    <h2>Recent Bookings</h2>
                                </div>

                                <button
                                    onClick={() => setActiveTab('My Bookings')}
                                    className="view-all-button"
                                >
                                    View All →
                                </button>
                            </div>

                            <div className="booking-table-wrapper">
                                <table className="booking-table">
                                    <thead>
                                        <tr>
                                            <th>BOOKING ID</th>
                                            <th>ROOM</th>
                                            <th>DATE</th>
                                            <th>GUESTS</th>
                                            <th>PRICE</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td>{booking.id}</td>
                                                <td>{booking.room}</td>
                                                <td>{booking.date}</td>
                                                <td>{booking.guests}</td>
                                                <td>{booking.price}</td>
                                                <td>
                                                    <span
                                                        className={`booking-status ${booking.status.toLowerCase()}`}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </section>
                    </>
                )}

                {/* MY BOOKINGS */}
                {activeTab === 'My Bookings' && (
                    <section className="dashboard-section bookings-page">

                        <div className="section-heading">
                            <div>
                                <p>RESERVATION HISTORY</p>
                                <h2>All Your Bookings</h2>
                            </div>
                        </div>

                        {bookings.map((booking) => (
                            <div className="booking-card" key={booking.id}>
                                <div>
                                    <span className="booking-id">
                                        {booking.id}
                                    </span>
                                    <h3>{booking.room}</h3>
                                    <p>{booking.date}</p>
                                    <p>{booking.guests}</p>
                                </div>

                                <div className="booking-card-right">
                                    <h3>{booking.price}</h3>
                                    <span
                                        className={`booking-status ${booking.status.toLowerCase()}`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}

                    </section>
                )}

                {/* MY PROFILE */}
                {activeTab === 'My Profile' && (
                    <section className="dashboard-section profile-section">

                        <div className="section-heading">
                            <div>
                                <p>ACCOUNT SETTINGS</p>
                                <h2>Personal Information</h2>
                            </div>
                        </div>

                        <div className="profile-card">
                            <div className="profile-avatar">G</div>

                            <div>
                                <h3>Guest User</h3>
                                <p>LuxuryStay Member</p>
                            </div>
                        </div>

                        <div className="profile-details">
                            <div>
                                <label>FULL NAME</label>
                                <p>Guest User</p>
                            </div>

                            <div>
                                <label>EMAIL ADDRESS</label>
                                <p>guest@example.com</p>
                            </div>

                            <div>
                                <label>PHONE NUMBER</label>
                                <p>Not provided</p>
                            </div>

                            <div>
                                <label>ACCOUNT TYPE</label>
                                <p>Customer</p>
                            </div>
                        </div>

                        <p className="profile-note">
                            Your account information will be connected
                            to your registered profile once backend
                            integration is complete.
                        </p>

                    </section>
                )}

                <footer className="dashboard-footer">
                    © 2026 LuxuryStay. All Rights Reserved.
                </footer>

            </main>
        </div>
    );
}

export default UserDashboard;
