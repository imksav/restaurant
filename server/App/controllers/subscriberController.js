const { subscriberModel } = require("../models/subscriberModel");

let subscriber = async (req, res) => {
  try {
    let { email } = req.body;
    let existingSubscriber = await subscriberModel.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    let newSubscriber = new subscriberModel({
      email,
    });
    let savedSubscriber = await newSubscriber.save();
    res.status(200).json({
      status: 1,
      msg: "New Subscriber subscribed",
      subscriber: savedSubscriber,
    });
  } catch (error) {
    res.satus(500).json({ message: "Server error" });
  }
};

module.exports = { subscriber };
