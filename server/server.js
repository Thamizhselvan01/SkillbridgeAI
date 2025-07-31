const express = require("express");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");
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

app.listen(PORT, () => {
  console.log(`Skillbridge AI Server is running on port ${PORT}`);
});
