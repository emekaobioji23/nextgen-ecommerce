const Admin = require("../models/admin-model");
const Seller = require("../models/seller-model");
const Buyer = require("../models/buyer-model");
const {
  signUp,
  signIn,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  sameUser,
} = require("./generic-controllers");

exports.adminSignUp = signUp(Admin);

exports.adminSignIn = signIn(Admin);

exports.getAllAdmin = getAll(Admin);

exports.getAllBuyers = getAll(Buyer);

exports.getAllSellers = getAll(Seller);

exports.getAdmin = getOne(Admin);

exports.updateAdmin = updateOne(Admin);

exports.deleteAdmin = deleteOne(Admin);

exports.adminForgotPassword = forgotPassword(Admin);

exports.resetAdminPassword = resetPassword(Admin);

exports.updateAdminPassword = updatePassword(Admin);

exports.protectAdmin = protect(Admin);

exports.sameAdmin = sameUser(Admin);
