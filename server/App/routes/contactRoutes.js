let express = require("express");
const { contactInsert } = require("../controllers/contactController");
let contactRouter = express.Router();

contactRouter.post("/create", contactInsert);

module.exports = { contactRouter };
