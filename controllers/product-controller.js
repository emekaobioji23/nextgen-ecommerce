const QueryMethod = require("../utils/query");
const catchAsync = require("../utils/catch-async");
const Econsole = require("../utils/Econsole-log");
const { Product } = require("../models/product-model")
const { createOne, getOne, updateOne, deleteOne } = require("./generic-controller");
const ErrorObject = require("../utils/error");
const { cloudDelete } = require("../utils/cloudinary")



exports.getProduct = getOne(Product)
exports.createProduct=createOne(Product)
/* exports.sameUser = (Model) =>
  catchAsync(async (req, res, next) => {
    const myconsole = new Econsole("generic-controller.js", "sameUser", "")
    myconsole.log("entry")
    if (req.user.id !== req.params.id) {
      return next(
        new ErrorObject(`You're not authorised to perform this action`, 403)
      );
    }
    myconsole.log("exits")
    next();
  }); */

exports.sellerOwnsProduct = catchAsync(async (req, res, next) => {
  const myconsole = new Econsole("product-controller.js", "sellerOwnsProduct", "")
  myconsole.log("entry")
  const product = await Product.findById(req.params.id);
  if (product) {
    if (product.sellerId != req.user.id) {
      myconsole.log("exits")
      return next(
        new ErrorObject(`You do not own the Product`, 403)
      );
    }else{
      myconsole.log("exits")
      next()
    }
  }else{
    myconsole.log("exits")
    return next(
      new ErrorObject(`The product does not exists`, 404)
    );
  }
});

exports.getAllProductsForSeller = catchAsync(async (req, res) => {
  const myconsole = new Econsole("product-controller.js", "getAllProductsForSeller", "")
  myconsole.log("entry")

  let filter = req.params.id ? { "sellerId": req.params.id } : {};
  const features = new QueryMethod(Product.find(filter), req.query)
    .sort()
    .limit()
    .paginate()
    .filter();

  const docs = await features.query;
  myconsole.log("exits")
  res.status(200).json({ status: "success", results: docs.length, data: docs, });
});


/* exports.createProduct = catchAsync(async (req, res, next) => {
  const myconsole = new Econsole("product-controller.js", "createProduct", "")
  myconsole.log("entry")
  const product = await Product.create(req.body);
  product.save();
  res.status(200).json({ status: "product created successfully", productInfo: { product }, });
  myconsole.log("exits")
}); */
exports.updateProduct = updateOne(Product)
exports.deleteProduct = deleteOne(Product)
exports.deleteProductImages = catchAsync(async (req, res, next) => {
  const myconsole = new Econsole("product-controller.js", "deleteProductImages", "")
  myconsole.log("entry")
  const product = await Product.findById(req.params.id);
  try {
    if (product.images) {
      product.images.forEach(async (imageFileURL, index) => {
        try {
          myconsole.log("imageFileURL", imageFileURL)
          await cloudDelete(imageFileURL);
        } catch (error) {
          myconsole.error(error);
        }
      });
    }
  } catch (error) {
    myconsole.error(error)
  }
  myconsole.log("exits")
  next()
});

