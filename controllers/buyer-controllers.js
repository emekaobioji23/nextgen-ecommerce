const multer = require("multer");
const path = require("path");
const Buyer = require("../models/buyer-model");
const catchAsync = require("../utils/catch-async");
const cloudUpload = require("../utils/cloudinary");
const sendEmail = require("../utils/email");
const ErrorObject = require("../utils/error");
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
} = require("../controllers/generic-controllers");


/* const { ADMIN_EMAIL } = process.env;*/

exports.buyerSignUp = signUp(Buyer);
//exports.getAllBuyers = getAll(Buyer);
exports.getBuyer = getOne(Buyer);
exports.protectBuyer = protect(Buyer);
exports.sameBuyer = sameUser(Buyer);
exports.deleteBuyer = deleteOne(Buyer);
exports.buyerSignIn = signIn(Buyer);
exports.updateBuyer = updateOne(Buyer);
exports.buyerForgotPassword = forgotPassword(Buyer);
exports.resetBuyerPassword = resetPassword(Buyer);
exports.updateBuyerPassword = updatePassword(Buyer);

/* const multerStorage = multer.diskStorage({});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    return "Please upload only an image file";
  }
};

const uploadCertificate = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadBuyersCertificate = uploadCertificate.single("certificate");

exports.certFormatter = catchAsync(async (req, res, next) => {
  if (req.file) {
    let id = req.params.id;
    const buyer = await Buyer.findById(id);
    if (!buyer) {
      return next(
        new ErrorObject(`There is no buyer with the ${req.params.id}`, 400)
      );
    }
    const image = {
      url: req.file.path,
      id: req.params.id,
    };
    const result = await cloudUpload(image);
    req.body.certificate = result.secure_url;
  }
  next();
});

exports.completeProfile = catchAsync(async (req, res, next) => {
  // Upload required information and document
  const buyer = await Buyer.findById(req.params.id);
  if (!buyer) {
    return next(new ErrorObject("Buyer with the requested ID not found", 400));
  }

  const certificate =
    req.body.certificate === undefined
      ? buyer.certificate
      : req.body.certificate;
  const yearsOfExperience =
    req.body.yearsOfExperience === undefined
      ? buyer.yearsOfExperience
      : req.body.yearsOfExperience;
  const setAvailableTime =
    req.body.setAvailableTime === undefined
      ? buyer.setAvailableTime
      : req.body.setAvailableTime;

  const update = { certificate, yearsOfExperience, setAvailableTime };
  const updatedProfile = await Buyer.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  // Send Mail to the admin with a url that gets the particular buyer

  try {
    await sendEmail({
      email: ADMIN_EMAIL,
      subject: "Certificate Upload Notification",
      message:
        `Certificate Uploaded from ${buyer.firstName} ${buyer.lastName} \n Email : ${buyer.email}` +
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

exports.verifyBuyer = catchAsync(async (req, res, next) => {
  const buyer = await Buyer.findById(req.params.id);
  if (!buyer) {
    return next(new ErrorObject("Buyer with the requested ID not found", 400));
  }

  buyer.accessable = req.body.accessable;
  buyer.verified = true;

  await buyer.save();
  res.status(200).json({
    status: "success",
    buyer,
  });
});
 */