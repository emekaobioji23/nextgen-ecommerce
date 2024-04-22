const QueryMethod = require("../utils/query");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const catchAsync = require("../utils/catch-async");
const ErrorObject = require("../utils/error");
const sendEmail = require("../utils/email");
const Econsole = require("../utils/Econsole-log");
const {Product} = require("../models/product-model")

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    //let filter = req.params.tourId ? { tourRef: req.params.tourId } : {};
    const myconsole = new Econsole("generic-controller.js", "getAll", "")
    myconsole.log("entry")
    let filter = {};
    const features = new QueryMethod(Model.find(filter), req.query)
      .sort()
      .limit()
      .paginate()
      .filter();

    const docs = await features.query;
    myconsole.log("exits")
    res.status(200).json({ status: "success", results: docs.length, data: docs, });
  });


exports.createProduct = catchAsync(async (req, res, next) => {
  const myconsole = new Econsole("product-controller.js", "createProduct", "")
  myconsole.log("entry")
  const product = await Product.create(req.body);
  product.save();
  res.status(200).json({ status: "product created successfully", productInfo: { product }, });
  myconsole.log("exits")
});
