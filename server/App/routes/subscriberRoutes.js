let express = require("express");
const { subscriber } = require("../controllers/subscriberController");
let subscriberRouter = express.Router();

subscriberRouter.post("/create", subscriber);

module.exports = { subscriberRouter };
