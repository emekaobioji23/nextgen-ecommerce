const express = require("express");
const econsole = require("../utils/econsole-log")
const {
  sellerSignUp,
  sellerSignIn,
  /*getAllSellers,*/
  getSeller,
  protectSeller,
  sameSeller,
  deleteSeller,
  updateSeller,
  sellerForgotPassword,
  resetSellerPassword,
  updateSellerPassword,
  uploadSellerPhoto,
  photoFormatter,
  rebuildSellerFormDataPropsIntoObject
/*   completeProfile,
  uploadSellersCertificate,
  certFormatter, */
} = require("../controllers/seller-controllers");

const router = express.Router();

const myconsole = new econsole("seller-routes.js","","")
router.post("/signup",uploadSellerPhoto,photoFormatter,rebuildSellerFormDataPropsIntoObject,sellerSignUp);

router.post("/signin", sellerSignIn);
//router.get("/",getAllSellers);
router.route("/:id").get(getSeller).patch(protectSeller, sameSeller, updateSeller).delete(protectSeller, sameSeller, deleteSeller);
router.post("/forgot-password", sellerForgotPassword);
router.patch("/reset-password/:token", resetSellerPassword);
router.patch("/update-password/:id", protectSeller, updateSellerPassword);
/*router.patch(
  "/complete-profile/:id",
  protectSeller,
  sameSeller,
  uploadSellersCertificate,
  certFormatter,
  completeProfile
); */
module.exports = router;
