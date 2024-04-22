const express = require("express");
const {
  adminSignUp,
  adminSignIn,
  getAllAdmin,
  getAllBuyers,
  getAllSellers,
  getAdmin,
  updateAdmin,
  adminForgotPassword,
  resetAdminPassword,
  updateAdminPassword,
  protectAdmin,
  sameAdmin,
} = require("../controllers/admin-controller");

const router = express.Router();

router.post("/signup", adminSignUp);

router.post("/signin", adminSignIn);

router.get("/", protectAdmin, getAllAdmin);

router.get("/buyers", protectAdmin, getAllBuyers);

router.get("/sellers", protectAdmin, getAllSellers);

router
  .route("/:id")
  .get(protectAdmin, getAdmin)
  .patch(protectAdmin, sameAdmin, updateAdmin);

router.post("/forgot-password", adminForgotPassword);

router.patch("/reset-password/:token", resetAdminPassword);

router.patch("/update-password/:id", protectAdmin, updateAdminPassword);

module.exports = router;
