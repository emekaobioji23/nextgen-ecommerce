const Econsole = require("../utils/Econsole-log")
const catchAsync=require("../utils/catch-async")
const Cart = require("../models/cart-model")
const { createOne, getOne ,getAllManyToOne,updateOne, deleteOne } = require("./generic-controller");

exports.getCart= getOne(Cart)
exports.getAllCartsForBuyer=getAllManyToOne(Cart,"buyerId")
exports.setBuyerIdInReqBody=(req,res,next)=>{
  const myconsole = new Econsole("cart-controller.js", "setProductIdInReqBody", "")
  myconsole.log("entry")
  req.body.buyerId=req.params.id,
  myconsole.log("req.body.buyerId=",req.body.buyerId)
  myconsole.log("exits")
  next()
}
exports.createCart=createOne(Cart)
exports.updateCart = updateOne(Cart)
exports.deleteCart = deleteOne(Cart)
exports.buyerOwnsCart = catchAsync(async (req, res, next) => {
  const myconsole = new Econsole("cart-controller.js", "buyerOwnsCart", "")
  myconsole.log("entry")
  const cart = await Cart.findById(req.params.id);
  if (cart) {
    if (cart.buyerId != req.user.id) {
      myconsole.log("error")
      return next(
        new ErrorObject(`You do not own the cart`, 403)
      );
    }else{
      myconsole.log("successful")
      myconsole.log("exits")
      next()
    }
  }else{
    myconsole.log("error")
    return next(
      new ErrorObject(`The cart does not exists`, 404)
    );
  }
});