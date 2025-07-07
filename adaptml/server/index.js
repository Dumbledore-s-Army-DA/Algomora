const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userProfileRoutes = require("./routes/userProfile");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB Atlas connection
mongoose.connect("mongodb+srv://vazdeanne5:vazdeanne121@unknowndb.2mgnf.mongodb.net/dBase?retryWrites=true&w=majority&appName=unknownDB")
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Routes
app.use("/api/userProfile", userProfileRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
