const express = require("express");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Skillbridge AI Server is running");
});

// Use routes
app.use("/api/auth", authRoutes);

// Import routes
app.use("/api/auth", require("./routes/authRoutes"));

// Middleware to protect routes
app.get("/api/auth/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "This is a protected route! You have access.",
    userId: req.user.id,
  });
});

// Example of fetching user details from a protected route
app.get("/api/profile", authMiddleware, async (req, res) => {
  // <-- NEW ROUTE
  try {
    // req.user.id comes from our authMiddleware
    const user = await User.findById(req.user.id).select("-password"); // -password means don't return the password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Skillbridge AI Server is running on port ${PORT}`);
});
