require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');

const questionRoutes = require('../routes/questionRoutes'); // Import question routes
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Log the MongoDB URI to ensure it's loaded correctly
console.log('Mongo URI:', process.env.MONGO_URI);

// Route handlers

app.use('/api/questions', questionRoutes); // Use question routes



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
