const express = require("express");
const {
  menuInsert,
  getMenu,
  getAllMenu,
  deleteMenu,
} = require("../controllers/menuController");

let menuRouter = express.Router();

menuRouter.post("/create", menuInsert);

menuRouter.get("/:id", getMenu);

menuRouter.get("/", getAllMenu);

menuRouter.delete("/:id", deleteMenu);

module.exports = { menuRouter };
