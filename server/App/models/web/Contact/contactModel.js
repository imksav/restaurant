let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    size: 255,
  },
  email: {
    type: String,
    required: true,
    size: 255,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
    size: 255,
  },
});
let contactModel = mongoose.model("enquiry", contactSchema);
module.exports = { contactModel };
