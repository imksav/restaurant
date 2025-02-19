let express = require("express");
const { contactInsert } = require("../../controllers/web/ContactController");
let contactRouter = express.Router();

contactRouter.post("/insert", contactInsert);

module.exports = { contactRouter };
