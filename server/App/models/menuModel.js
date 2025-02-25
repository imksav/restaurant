let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let menuSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Appetizer", "Lamb Curry Dishes", "Dessert", "Beverage"],
      required: true,
    },
    imageUrl: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const MenuModel = mongoose.model("menu", menuSchema);

module.exports = { MenuModel };
