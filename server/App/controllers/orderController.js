const { MenuModel } = require("../models/menuModel");
const { OrderModel } = require("../models/ordermodel");
const { UserModel } = require("../models/userModel");

const createOrder = async (req, res) => {
  try {
    const { user, items, deliveryAddress, paymentMethod } = req.body;

    // Validate user and items
    if (
      !user ||
      !items ||
      items.length === 0 ||
      !deliveryAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Check if user exists
    const existingUser = await UserModel.findById(user);
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Calculate total amount and validate menu items
    let totalAmount = 0;
    const validateItems = [];
    for (const item of items) {
      const menuItem = await MenuModel.findById(item.menuItem);
      if (!menuItem || !menuItem.isAvailable) {
        return res
          .status(404)
          .json({ msg: "Menu item not found or not available" });
      }
      validateItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        priceAtOrder: menuItem.price,
      });
      totalAmount += menuItem.price * item.quantity;
    }

    // Create the order
    const order = new OrderModel({
      user,
      items: validateItems,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });

    await order.save();

    // Increment the order count in the user table
    await UserModel.findByIdAndUpdate(user, { $inc: { orderCount: 1 } });

    res.status(200).json({
      status: 1,
      msg: "Order Created Successfully",
      data: [
        order.user,
        order.items[0].menuItem,
        order.items[0].quantity,
        order.items[0].priceAtOrder,
        order.totalAmount,
        order.status,
        order.deliveryAddress,
        order.paymentMethod,
      ],
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get orders for a specific user
const getUserOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await OrderModel.find({ user: userId })
      .populate("user", "name email role orderCount")
      .populate("items.menuItem", "itemName category price");

    // Check if orders exist
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        status: 0,
        msg: "No orders found for this user",
      });
    }

    res.status(200).json({
      status: 1,
      msg: "User order details",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all orders (admin)
const getAllOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "username email role orderCount")
      .populate("items.menuItem", "itemName price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updateData = req.body;

    if (
      !orderId ||
      !updateData ||
      updateData === null ||
      updateData === undefined ||
      Object.keys(updateData).length === 0
    ) {
      res.status(404).json({ msg: "Order ID or update data is missing" });
    }
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      res.status(404).json({ msg: "Order not found" });
    }
    res.status(200).json({
      status: 1,
      msg: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

// delete the order

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    if (!orderId) {
      res.status(404).json({ msg: "Order ID rerquired" });
    }

    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      res.status(404).json({ msg: "Order not found" });
    }
    res.status(200).json({
      status: 1,
      msg: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = {
  createOrder,
  getUserOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
};
