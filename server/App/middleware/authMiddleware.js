const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  if (!token) {
    return res.status(401).json({ msg: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user ID in `req.user`
    next(); // Move to the next function
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
