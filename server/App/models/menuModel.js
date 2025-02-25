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
      enum: [
        "Veg Starters",
        "Non-Veg Starters",
        "Chicken Curry Dishes",
        "Lamb Curry Dishes",
        "Veg Curry Dishes",
        "Sizzling Mix Grill",
      ],
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
