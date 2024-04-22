const { default: mongoose } = require("mongoose");
/* const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Econsole = require("../utils/Econsole-log")
 */
const productSchema = new mongoose.Schema({
  name: String,//required
  description: String,//required
  richDescription: String,//optional
  images: [String],//required
  price: Number,//required
  discount: Number,//validate between 0 & 100/optional
  rating: Number,//validate min 0 max 5
  quantity: Number,//required
  isAvailable: Boolean,//required
  sellerId: mongoose.Schema.Types.ObjectId//required

},{toObject: {virtuals: true,},toJSON: {virtuals: true,},});


const Product = mongoose.model('Product', productSchema);
module.exports = {Product}; 
