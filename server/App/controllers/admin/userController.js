const { UserModel } = require("../../models/admin/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect password" });
    }
    // Assign JWT - Json Web Token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );
    // Send JWT in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent access from JavaScript (protects against XSS attacks)
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    });
    res.status(200).json({
      status: 1,
      msg: "Login Successfull",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

let userSignup = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();

    const user = await UserModel.findOne({ email });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }
    if (req.body.password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters long" });
    }

    if (user) {
      return res.status(409).json({
        status: 0,
        msg: "User already exists",
        email: req.body.email,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 15);

    // Create new user
    const newUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    // Assign JWT - Json Web Token
    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    res.status(201).json({
      status: 1,
      msg: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      msg: "Internal Server Error. Please try again later.",
    });
  }
};

const userLogout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) }); // Clear the cookie
  res.status(200).json({ msg: "Logout successful" });
};
module.exports = { userLogin, userSignup, userLogout };
