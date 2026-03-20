require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error", err));

module.exports = app;
