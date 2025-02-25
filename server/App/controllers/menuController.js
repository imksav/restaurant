const { MenuModel } = require("../models/menuModel");

const menuInsert = async (req, res) => {
  try {
    let menuItems = req.body;

    // Validate that menuItems is an array
    if (!Array.isArray(menuItems)) {
      menuItems = [menuItems];
    }

    // Insert multiple menu items
    const savedMenus = await MenuModel.insertMany(menuItems, {
      ordered: false,
    });

    res.status(200).json({
      status: 1,
      msg: "Menu items saved successfully",
      data: savedMenus,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: error.message,
    });
  }
};

// get a menu

const getMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    if (!menuId) {
      return res.status(404).json({ msg: "Missing menu id" });
    }

    const menus = await MenuModel.findById(menuId);
    if (!menus || menus.length === 0) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    res.status(200).json({
      status: 1,
      msg: "Received menu list",
      data: menus,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get all menus

const getAllMenu = async (req, res) => {
  try {
    const menus = await MenuModel.find();
    res.status(200).json({ menus });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete menu

const deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    if (!menuId) {
      res.status(404).json({ msg: "Menu not found" });
    }
    const deletedMenu = await MenuModel.findByIdAndDelete(menuId);
    if (!deletedMenu) {
      res.status(404).json({ msg: "Menu not found" });
    }

    res.status(200).json({
      status: 1,
      msg: "Menu deleted successfully",
      data: deletedMenu,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { menuInsert, getMenu, getAllMenu, deleteMenu };
