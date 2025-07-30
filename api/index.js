const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const kostRoutes = require('./routes/kostRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/admin/roomRoutes');
const tenantRoutes = require('./routes/admin/tenantRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');

// Middleware & Routing
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from public folder

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/kost', kostRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin/rooms', roomRoutes);
app.use('/api/admin/tenants', tenantRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));