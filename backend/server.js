require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
const path = require('path');
const app = express();

// Route Imports
const transportRoutes = require('./routes/transport-routes');
const authRoutes = require('./routes/auth');

// Passport Configuration
require('./config/passport')(passport);

// MongoDB Connection
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Session, Flash & Passport Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretKey',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);    
app.use('/api/transports', transportRoutes);

// Default route for root URL
app.get('/', (req, res) => {
  res.send("Backend server is running. Use /api/auth or /api/transports.");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
