const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "menu",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        priceAtOrder: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Cash"],
      required: true,
    },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model("order", orderSchema);
module.exports = { OrderModel };
