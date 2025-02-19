let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();

let app = express();

// Connect to MongoDB

mongoose.connect(process.env.DBURL).then(() => {
  try {
    console.log("Connected to database");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
});
