let express = require("express");
const { login, register, logout } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

let loginRouter = express.Router();

loginRouter.post("/login", login);
loginRouter.post("/register", register);
loginRouter.get("/profile", authMiddleware.protect, (req, res) => {
  res.json({ msg: "Welcome to your profile!", user: req.user });
});
loginRouter.get("/logout", logout);

loginRouter.get(
  "/admin",
  authMiddleware.protect,
  authMiddleware.isAdmin,
  (req, res) => {
    res.json({ msg: "Welcome, Admin" });
  }
);

module.exports = { loginRouter };
