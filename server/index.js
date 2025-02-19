let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();
const { connectDB } = require("./App/components/dbconnection");
const { contactRouter } = require("./App/routes/web/ContactRoutes");
const { subscriberRouter } = require("./App/routes/web/subscriberRoutes");
const { loginRouter } = require("./App/routes/admin/loginRoutes");

let app = express();
app.use(express.json());

// Routes
app.use("/api/restaurant/contact", contactRouter);
app.use("/api/restaurant/", subscriberRouter);
app.use("/api/restaurant/", loginRouter);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
