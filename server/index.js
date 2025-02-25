let express = require("express");
require("dotenv").config();
const { connectDB } = require("./App/components/dbconnection");
const { contactRouter } = require("./App/routes/contactRoutes");
const { subscriberRouter } = require("./App/routes/subscriberRoutes");
const { loginRouter } = require("./App/routes/loginRoutes");
const { menuRouter } = require("./App/routes/menuRoutes");
const { orderRouter } = require("./App/routes/orderRoutes");

let app = express();
app.use(express.json());

// Routes
app.use("/api/restaurant/contact", contactRouter);
app.use("/api/restaurant/subscribe", subscriberRouter);
app.use("/api/restaurant/", loginRouter);
app.use("/api/restaurant/menu/", menuRouter);
app.use("/api/restaurant/order/", orderRouter);

// Connect to MongoDB
connectDB();

// Global Error Handler
app.use((err, res, req, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
  });
});

// Connect to server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
