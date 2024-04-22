const express = require("express");
const Econsole = require("../utils/Econsole-log")
const {
  buyerSignUp,
  buyerSignIn,
  getAllBuyers,
  getBuyer,
  protectBuyer,
  sameBuyer,
  deleteBuyer,
  updateBuyer,
  buyerForgotPassword,
  resetBuyerPassword,
  updateBuyerPassword,
/*   completeProfile,
  uploadBuyersCertificate,
  certFormatter, */
} = require("../controllers/buyer-controller");

const router = express.Router();

router.post("/signup",buyerSignUp);
router.post("/signin", buyerSignIn);
//router.get("/",getAllBuyers);
router.route("/:id").get(getBuyer).patch(protectBuyer, sameBuyer, updateBuyer).delete(protectBuyer, sameBuyer, deleteBuyer);
router.post("/forgot-password", buyerForgotPassword);
router.patch("/reset-password/:token", resetBuyerPassword);
router.patch("/update-password/:id", protectBuyer, updateBuyerPassword);
/*router.patch(
  "/complete-profile/:id",
  protectBuyer,
  sameBuyer,
  uploadBuyersCertificate,
  certFormatter,
  completeProfile
); */
module.exports = router;
