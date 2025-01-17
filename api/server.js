// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const setAlert=require('./routes/set-alert')
const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/Register');

const startPriceAlertService = require("./priceAlertService");


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth',registerRoutes);
app.use('/api/auth',setAlert);
// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('DB Connection Error:', error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// Start the price alert service
startPriceAlertService();