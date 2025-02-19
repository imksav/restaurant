const mongoose = require("mongoose");

let connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DBURL, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    s;
    process.exit(1);
  }
};
module.exports = { connectDB };
