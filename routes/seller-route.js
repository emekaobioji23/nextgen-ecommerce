const express = require("express");
const Econsole = require("../utils/Econsole-log")
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
} = require("../controllers/seller-controller");

const router = express.Router();

const myconsole = new Econsole("seller-route.js","","")
router.post("/signup",uploadSellerPhoto,photoFormatter,rebuildSellerFormDataPropsIntoObject,sellerSignUp);

router.post("/signin", sellerSignIn);
//router.get("/",getAllSellers);
router.route("/:id").get(getSeller).patch(protectSeller, sameSeller,uploadSellerPhoto,photoFormatter,rebuildSellerFormDataPropsIntoObject, updateSeller).delete(protectSeller, sameSeller, deleteSeller);
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
