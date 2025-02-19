const { contactModel } = require("../../models/web/Contact/ContactModel");

let contactInsert = async (req, res) => {
  let { name, email, phone, message } = req.body;

  let newUser = new contactModel({
    name,
    email,
    phone,
    message,
  });
  let savedUser = await newUser.save();
  res.status(200).json({
    status: 1,
    msg: "Contact Insert API",
    data: savedUser,
  });
};

module.exports = { contactInsert };
