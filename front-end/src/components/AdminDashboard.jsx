import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  const menuItems = [
    { name: "Overview", icon: "⌂" },
    { name: "Rooms", icon: "▣" },
    { name: "Bookings", icon: "▤" },
    { name: "Customers", icon: "♙" },
    { name: "Staff & Roles", icon: "♙" },
  ];

  const rooms = [
    {
      id: 1,
      name: "Deluxe Ocean Suite",
      type: "Suite",
      price: "$150 / night",
      status: "Available",
    },
    {
      id: 2,
      name: "Executive King Room",
      type: "King Room",
      price: "$120 / night",
      status: "Occupied",
    },
    {
      id: 3,
      name: "Presidential Suite",
      type: "Luxury Suite",
      price: "$350 / night",
      status: "Available",
    },
    {
      id: 4,
      name: "Superior Twin Room",
      type: "Twin Room",
      price: "$100 / night",
      status: "Maintenance",
    },
  ];

  const bookings = [
    {
      id: "#LS-1024",
      customer: "Ahmed Khan",
      room: "Deluxe Ocean Suite",
      date: "12 Nov 2026 - 15 Nov 2026",
      amount: "$450",
      status: "Confirmed",
    },
    {
      id: "#LS-1025",
      customer: "Sara Ahmed",
      room: "Executive King Room",
      date: "20 Nov 2026 - 22 Nov 2026",
      amount: "$240",
      status: "Pending",
    },
    {
      id: "#LS-1026",
      customer: "Ali Raza",
      room: "Presidential Suite",
      date: "25 Nov 2026 - 27 Nov 2026",
      amount: "$700",
      status: "Confirmed",
    },
    {
      id: "#LS-1027",
      customer: "Fatima Noor",
      room: "Superior Twin Room",
      date: "28 Nov 2026 - 30 Nov 2026",
      amount: "$200",
      status: "Cancelled",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      phone: "+92 300 1234567",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      email: "sara@example.com",
      phone: "+92 301 2345678",
    },
    {
      id: 3,
      name: "Ali Raza",
      email: "ali@example.com",
      phone: "+92 302 3456789",
    },
    {
      id: 4,
      name: "Fatima Noor",
      email: "fatima@example.com",
      phone: "+92 303 4567890",
    },
  ];
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed@luxurystay.com",
      role: "Manager",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      email: "sara@luxurystay.com",
      role: "Receptionist",
    },
    {
      id: 3,
      name: "Ali Raza",
      email: "ali@luxurystay.com",
      role: "Housekeeping",
    },
    {
      id: 4,
      name: "Fatima Noor",
      email: "fatima@luxurystay.com",
      role: "Staff",
    },
  ]);

  const [selectedRoles, setSelectedRoles] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const renderStatus = (status) => (
    <span className={`admin-status ${status.toLowerCase()}`}>{status}</span>
  );

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <Link to="/" className="admin-logo">
          LUXURY<span>STAY</span>
          <small>ADMIN PANEL</small>
        </Link>

        <div className="admin-welcome">
          <p>ADMINISTRATOR</p>
          <h3>Welcome, Admin</h3>
        </div>

        <nav className="admin-menu">
          <p className="admin-menu-heading">MAIN MENU</p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activeTab === item.name
                  ? "admin-menu-item active"
                  : "admin-menu-item"
              }
              onClick={() => setActiveTab(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-back-link">
            ← Visit Website
          </Link>

          <Link to="/login" className="admin-logout">
            ↪ Logout
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-breadcrumb">LUXURYSTAY / ADMINISTRATION</p>
            <h1>{activeTab}</h1>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <h4>Administrator</h4>
              <p>System Admin</p>
            </div>
          </div>
        </header>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <>
            <section className="admin-welcome-banner">
              <div>
                <p>HOTEL MANAGEMENT SYSTEM</p>
                <h2>Welcome to Admin Dashboard</h2>
                <span>
                  Manage your hotel operations, reservations and customers from
                  one place.
                </span>
              </div>
              <div className="admin-banner-icon">✦</div>
            </section>

            <section className="admin-stats">
              <div className="admin-stat-card">
                <span className="admin-stat-icon">▣</span>
                <p>Total Rooms</p>
                <h2>48</h2>
                <small>Registered hotel rooms</small>
              </div>

              <div className="admin-stat-card">
                <span className="admin-stat-icon">▤</span>
                <p>Total Bookings</p>
                <h2>124</h2>
                <small>All reservations</small>
              </div>

              <div className="admin-stat-card">
                <span className="admin-stat-icon">♙</span>
                <p>Total Customers</p>
                <h2>86</h2>
                <small>Registered customers</small>
              </div>

              <div className="admin-stat-card">
                <span className="admin-stat-icon">$</span>
                <p>Total Revenue</p>
                <h2>$12,450</h2>
                <small>Demo revenue overview</small>
              </div>
            </section>

            <section className="admin-content-section">
              <div className="admin-section-heading">
                <div>
                  <p>RECENT ACTIVITY</p>
                  <h2>Recent Bookings</h2>
                </div>

                <button
                  onClick={() => setActiveTab("Bookings")}
                  className="admin-view-all"
                >
                  View All →
                </button>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>BOOKING ID</th>
                      <th>CUSTOMER</th>
                      <th>ROOM</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 3).map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.customer}</td>
                        <td>{booking.room}</td>
                        <td>{booking.amount}</td>
                        <td>{renderStatus(booking.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ROOMS */}
        {activeTab === "Rooms" && (
          <section className="admin-content-section">
            <div className="admin-section-heading">
              <div>
                <p>HOTEL INVENTORY</p>
                <h2>Manage Rooms</h2>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ROOM ID</th>
                    <th>ROOM NAME</th>
                    <th>ROOM TYPE</th>
                    <th>PRICE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td>
                        RM-{room.id}00{room.id}
                      </td>
                      <td>{room.name}</td>
                      <td>{room.type}</td>
                      <td>{room.price}</td>
                      <td>{renderStatus(room.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* BOOKINGS */}
        {activeTab === "Bookings" && (
          <section className="admin-content-section">
            <div className="admin-section-heading">
              <div>
                <p>RESERVATION MANAGEMENT</p>
                <h2>All Bookings</h2>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>BOOKING ID</th>
                    <th>CUSTOMER</th>
                    <th>ROOM</th>
                    <th>STAY DATES</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.room}</td>
                      <td>{booking.date}</td>
                      <td>{booking.amount}</td>
                      <td>{renderStatus(booking.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* CUSTOMERS */}
        {activeTab === "Customers" && (
          <section className="admin-content-section">
            <div className="admin-section-heading">
              <div>
                <p>CUSTOMER MANAGEMENT</p>
                <h2>Registered Customers</h2>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>CUSTOMER NAME</th>
                    <th>EMAIL ADDRESS</th>
                    <th>PHONE NUMBER</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>#{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* STAFF & ROLES */}
        {activeTab === "Staff & Roles" && (
          <section className="admin-content-section">
            <div className="admin-section-heading">
              <div>
                <p>EMPLOYEE MANAGEMENT</p>
                <h2>Staff & Roles</h2>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>EMPLOYEE ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>CURRENT ROLE</th>
                    <th>ASSIGN ROLE</th>
                  </tr>
                </thead>

                <tbody>
                  {staff.map((member) => (
                    <tr key={member.id}>
                      <td>#{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.role}</td>

                      <td>
                        <select
                          value={selectedRoles[member.id] ?? member.role}
                          onChange={(e) => {
                            setSelectedRoles({
                              ...selectedRoles,
                              [member.id]: e.target.value,
                            });
                          }}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Receptionist">Receptionist</option>
                          <option value="Housekeeping">Housekeeping</option>
                          <option value="Staff">Staff</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <footer className="admin-footer">
          © 2026 LuxuryStay. Admin Management Panel.
        </footer>
      </main>
    </div>
  );
}

export default AdminDashboard;
