const { UserModel } = require("../../models/admin/userModel");

let userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", email, password);
    const user = UserModel.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ msg: "User doesn't exists" });
    }
    //     res.status(200).json({
    //       status: 1,
    //       msg: "API sucessfull",
    //       data: email,
    //     });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { userLogin };
