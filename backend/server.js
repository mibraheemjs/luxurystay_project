const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');
const paymentRoutes = require('./routes/paymentRoutes')
const serviceRoutes = require('./routes/serviceRoutes');
const serviceOrderRoutes = require('./routes/serviceOrderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const housekeepingRoutes = require('./routes/housekeepingRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const staffRoutes = require('./routes/staffRoutes');
const reportRoutes = require('./routes/reportRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const settingRoutes = require('./routes/settingRoutes');
const emailRoutes = require('./routes/emailRoutes');



const connectDB = require('./config/db');



const app = express();

// middeware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users',userRoutes)
app.use('/api/bookings',bookingRoutes)
app.use('/api/rooms', roomRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/serviceOrder', serviceOrderRoutes);
app.use('/api/Review', reviewRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use('/api/housekeeping', housekeepingRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/emails', emailRoutes);



app.get('/', (req, res) => {
    res.send('LuxuryStay Hotel Management API is running!');
});

const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });

    } catch (error) {
        console.log('Server failed to start:', error.message);
    }
};

startServer();