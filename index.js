
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const buyerRoute = require("./routes/buyer-route");
const sellerRoute = require("./routes/seller-route");
const adminRoute = require("./routes/admin-route");
const productRoute = require("./routes/product-route");
const cartRoute = require("./routes/cart-route");
const ErrorHandler = require("./controllers/error-controller");
const ErrorObject = require("./utils/error");
const { PORT } = process.env;

const app = express();


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);


// Middlewares

// body parser
app.use(express.json());

// Cors
app.use(cors());

// Using Static files
app.use(express.static(`${__dirname}/public`));

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// Route

app.use("/api/v1/buyers", buyerRoute);
app.use("/api/v1/sellers", sellerRoute);
app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);

app.all("*", (req, res, next) => {
  const err = new ErrorObject(
    `${req.protocol}://${req.get("host")}${req.url} not found`, 404);
  next(err);
});

// Error Handling
app.use(ErrorHandler);
module.exports = app;
