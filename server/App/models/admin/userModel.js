let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  //   username: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //     trim: true,
  //     lowercase: true,
  //     size: 50,
  //   },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    size: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
    size: 255,
  },
  role: {
    type: String,
    required: false,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // Generate Salt
    const salt = await bcrypt.genSalt(10);
    //   Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    //   Replace the plain password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
