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
} = require("./generic-controller");


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