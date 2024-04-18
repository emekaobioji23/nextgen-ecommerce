const multer = require("multer");
const path = require("path");
const Seller = require("../models/seller-model");
const catchAsync = require("../utils/catch-async");
const cloudUpload = require("../utils/cloudinary");
const sendEmail = require("../utils/email");
const ErrorObject = require("../utils/error");
const econsole = require("../utils/econsole-log")
const {
  signUp,
  signIn,
  protect,
  sameUser,
  getOne,
  deleteOne,
  updateOne,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("./generic-controllers");


/* const { ADMIN_EMAIL } = process.env;*/


exports.sellerSignUp = signUp(Seller);
exports.getSeller = getOne(Seller);
exports.protectSeller = protect(Seller);
exports.sameSeller = sameUser(Seller);
exports.deleteSeller = deleteOne(Seller);
exports.sellerSignIn = signIn(Seller);
exports.updateSeller = updateOne(Seller);
exports.sellerForgotPassword = forgotPassword(Seller);
exports.resetSellerPassword = resetPassword(Seller);
exports.updateSellerPassword = updatePassword(Seller);

 const multerStorage = multer.diskStorage({});


const multerFilter = (req, file, cb) => {
  const myconsole = new econsole("seller-controllers.js", "multerFilter", "")
  myconsole.log("entry")
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only an image file"), false);
  }
  myconsole.log("exits")
};

const sellerPhoto = multer({
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadSellerPhoto = sellerPhoto.single("photo");

exports.photoFormatter = catchAsync(async (req, res, next) => {
  const myconsole = new econsole("seller-controllers.js", "photoFormatter", "")
  myconsole.log("entry")
  if (req.file) {
    /* let id = req.params.id;
    const seller = await Seller.findById(id);
    if (!seller) {
      return next(
        new ErrorObject(`There is no seller with the ${req.params.id}`, 400)
      );
    } */
    const image = {
      url: req.file.path,
      //id: req.params.id,
    };
    const result = await cloudUpload(image);
    req.body.photo = result.secure_url;
  }
  myconsole.log("exits")
  next();
});

exports.rebuildSellerFormDataPropsIntoObject = catchAsync(async (req, res, next) => {
  const myconsole = new econsole("seller-controllers.js", "rebuildSellerFormDataPropsIntoObject", "")
  myconsole.log("entry")
  req.body.address= {"street":req.body.street,"city":req.body.city,"state":req.body.state,"country":req.body.country}
  myconsole.log("exits")
  next();
});
/*exports.completeProfile = catchAsync(async (req, res, next) => {
  // Upload required information and document
  const seller = await Seller.findById(req.params.id);
  if (!seller) {
    return next(new ErrorObject("Seller with the requested ID not found", 400));
  }

  const certificate =
    req.body.certificate === undefined
      ? seller.certificate
      : req.body.certificate;
  const yearsOfExperience =
    req.body.yearsOfExperience === undefined
      ? seller.yearsOfExperience
      : req.body.yearsOfExperience;
  const setAvailableTime =
    req.body.setAvailableTime === undefined
      ? seller.setAvailableTime
      : req.body.setAvailableTime;

  const update = { certificate, yearsOfExperience, setAvailableTime };
  const updatedProfile = await Seller.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  // Send Mail to the admin with a url that gets the particular seller

  try {
    await sendEmail({
      email: ADMIN_EMAIL,
      subject: "Certificate Upload Notification",
      message:
        `Certificate Uploaded from ${seller.firstName} ${seller.lastName} \n Email : ${seller.email}` +
        "\n" +
        updatedProfile,
    });
    res.status(200).json({
      status: "success",
      updatedProfile,
      message: "message has been sent to your mail",
    });
  } catch (error) {
    res.status(400).json({
      message: "error sending your message to the mail",
    });
  }
});

exports.verifySeller = catchAsync(async (req, res, next) => {
  const seller = await Seller.findById(req.params.id);
  if (!seller) {
    return next(new ErrorObject("Seller with the requested ID not found", 400));
  }

  seller.accessable = req.body.accessable;
  seller.verified = true;

  await seller.save();
  res.status(200).json({
    status: "success",
    seller,
  });
});
 */