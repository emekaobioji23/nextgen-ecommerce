
const { default: mongoose } = require("mongoose");
const cartSchema = new mongoose.Schema({
  productId: String,//required
  quantity: Number,//required
  buyerId: String,//required
  createdAt: {type:Date, default: Date.now()},
  updatedAt: Date},
  {toObject: {virtuals: true,},toJSON: {virtuals: true,},});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
