const { UserModel } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let login = async (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: "Password must be at least 8 characters, include an uppercase letter, lowercase letter, number, and special character",
    });
  }
  try {
    const user = await UserModel.findOne({ email });
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
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );
    // res.json({ token });
    // Send JWT in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent access from JavaScript (protects against XSS attacks)
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 5 * 60 * 1000,
    });
    res.status(200).json({
      status: 1,
      msg: "Login Successful",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

let register = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: "Password must be at least 8 characters, include an uppercase letter, lowercase letter, number, and special character",
    });
  }
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "user already exists" });
    }
    const user = new UserModel({
      name,
      email,
      password,
      role,
    });
    await user.save();
    res.status(200).json({
      status: 1,
      msg: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error. Please try again later.",
    });
  }
};

const logout = (req, res) => {
  if (!req.cookies.token) {
    return res
      .status(400)
      .json({ msg: "No token found. User is already logged out." });
  }
  res.cookie("token", "", { expires: new Date(0) }); // Clear the cookie
  res.status(200).json({ msg: "Logout successful" });
};
module.exports = { login, register, logout };
