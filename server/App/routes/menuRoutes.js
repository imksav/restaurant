const express = require("express");
const { menuInsert } = require("../controllers/menuController");

let menuRouter = express.Router();

menuRouter.post("/create", menuInsert);

module.exports = { menuRouter };
