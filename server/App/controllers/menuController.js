const { MenuModel } = require("../models/menuModel");

const menuInsert = async (req, res) => {
  let { itemName, description, price, category, imageUrl, isAvailable } =
    req.body;
  let newMenu = new MenuModel({
    itemName,
    description,
    price,
    category,
    imageUrl,
    isAvailable,
  });
  let savedMenu = await newMenu.save();
  res.status(200).json({
    status: 1,
    msg: "Menu Item Saved",
    data: savedMenu,
  });
};

module.exports = { menuInsert };
