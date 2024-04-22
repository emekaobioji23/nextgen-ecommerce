const express = require("express");
const {createProduct} = require("../controllers/product-controller");
const {validateProduct}= require("../utils/joi-validators")
const {uploadImages,uploadFilesToCloudinaryAndReturnFileObjects,delayMiddleware,getUploadedFileURLs}= require("../utils/file-upload")
const {protectSeller,sameSeller}=require("../controllers/seller-controller")



const router = express.Router();

router.post("/create-product/:id",uploadImages,uploadFilesToCloudinaryAndReturnFileObjects,delayMiddleware,getUploadedFileURLs,protectSeller,sameSeller,validateProduct,createProduct);
//router.post("/signin", buyerSignIn);
//router.get("/",getAllBuyers);
/* router.route("/:id").get(getBuyer).patch(protectBuyer, sameBuyer, updateBuyer).delete(protectBuyer, sameBuyer, deleteBuyer);
router.post("/forgot-password", buyerForgotPassword);
router.patch("/reset-password/:token", resetBuyerPassword);
router.patch("/update-password/:id", protectBuyer, updateBuyerPassword); */
/*router.patch(
  "/complete-profile/:id",
  protectBuyer,
  sameBuyer,
  uploadBuyersCertificate,
  certFormatter,
  completeProfile
); */
module.exports = router;
