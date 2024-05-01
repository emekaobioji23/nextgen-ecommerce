const Buyer = require("../models/buyer-model");
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

exports.buyerSignUp = signUp(Buyer);
exports.getBuyer = getOne(Buyer);
exports.protectBuyer = protect(Buyer);
exports.sameBuyer = sameUser(Buyer);
exports.deleteBuyer = deleteOne(Buyer);
exports.buyerSignIn = signIn(Buyer);
exports.updateBuyer = updateOne(Buyer);
exports.buyerForgotPassword = forgotPassword(Buyer);
exports.resetBuyerPassword = resetPassword(Buyer);
exports.updateBuyerPassword = updatePassword(Buyer);