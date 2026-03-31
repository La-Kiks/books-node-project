const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
    validate: {
      validator: (value) => !/\s/.test(value),
      message: "Password must not contain spaces",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
