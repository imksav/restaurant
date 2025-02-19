let express = require("express");
const { subscriber } = require("../../controllers/web/subscriberController");
let subscriberRouter = express.Router();

subscriberRouter.post("/subscriber", subscriber);

module.exports = { subscriberRouter };
