const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // removes whitespace from both ends
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // stores emails in lowercase
    match: [/.+@.+\..+/, "Please enter a valid email address"], // basic email validation
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
