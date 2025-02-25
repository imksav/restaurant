const express = require("express");
const {
  createOrder,
  getUserOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);

orderRouter.get("/user/:userId", getUserOrder);

orderRouter.get("/all", getAllOrder);

orderRouter.put("/update/:orderId", updateOrder);

orderRouter.delete("/delete/:orderId", deleteOrder);

module.exports = { orderRouter };
