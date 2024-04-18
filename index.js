
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const buyerRoutes = require("./routes/buyer-routes");
const sellerRoutes = require("./routes/seller-routes");
const adminRoutes = require("./routes/admin-routes");
const ErrorHandler = require("./controllers/error-controllers");
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

// Routes

app.use("/api/v1/buyers", buyerRoutes);
app.use("/api/v1/sellers", sellerRoutes);
app.use("/api/v1/admins", adminRoutes);

app.all("*", (req, res, next) => {
  const err = new ErrorObject(
    `${req.protocol}://${req.get("host")}${req.url} not found`, 404);
  next(err);
});

// Error Handling
app.use(ErrorHandler);
module.exports = app;
