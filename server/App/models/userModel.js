let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    size: 255,
  },
  role: {
    type: String,
    default: "user",
    lowercase: true,
  },
  orderCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
