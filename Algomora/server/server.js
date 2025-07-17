require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const questionRoutes = require('../routes/questionRoutes');
const userRoutes = require('../routes/authRoutes');
const userProfileRoutes = require('../routes/userProfileRoutes');
const events = require('../routes/events'); // ✅ NEW: add this
const leaderboardRoutes = require('../routes/leaderboard');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/userProfile', userProfileRoutes);


// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', events); // ✅ NEW: add this line
app.use('/api/leaderboard', leaderboardRoutes);



mongoose.set('debug', true);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err.message));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));