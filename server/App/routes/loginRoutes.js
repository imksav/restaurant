let express = require("express");
const {
  userLogin,
  userSignup,
  userLogout,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

let loginRouter = express.Router();

loginRouter.post("/login", userLogin);
loginRouter.post("/signup", userSignup);
loginRouter.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to the dashboard!", user: req.user });
});
loginRouter.get("/logout", userLogout);

module.exports = { loginRouter };
