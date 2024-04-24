
const express = require("express");
const {createCart,getCart,setBuyerIdInReqBody,buyerOwnsCart,getAllCartsForBuyer,updateCart,deleteCart} = require("../controllers/cart-controller");
const {protectBuyer,sameBuyer}=require("../controllers/buyer-controller")




const router = express.Router();

router.post("/create-cart/:id",protectBuyer,sameBuyer,setBuyerIdInReqBody,createCart);//:id = buyer
router.get("/carts-buyer/:id",protectBuyer,sameBuyer,getAllCartsForBuyer);//:id = buyer
router.route("/:id").get(protectBuyer,buyerOwnsCart,getCart).
patch(protectBuyer, buyerOwnsCart,updateCart).
delete(protectBuyer, buyerOwnsCart,deleteCart);//:id = cart
module.exports = router;
