let express = require("express");
const { userLogin } = require("../../controllers/admin/userController");
let loginRouter = express.Router();

loginRouter.post("/login", userLogin);

module.exports = { loginRouter };
