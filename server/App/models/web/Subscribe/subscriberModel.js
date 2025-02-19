let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let subscriber = new Schema({
  email: {
    type: String,
    required: true,
    unique: false,
  },
});
let subscriberModel = mongoose.model("subscriber", subscriber);
module.exports = { subscriberModel };
