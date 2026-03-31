const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }
    if (/\s/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must not contain spaces" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages[0] });
    }

    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already in use" });
    }

    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      }),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
