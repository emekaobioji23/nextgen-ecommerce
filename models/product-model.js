const { default: mongoose } = require("mongoose");
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
  sellerId: String,//required
  createdAt: {type:Date, default: Date.now()},
  updatedAt: Date

},{toObject: {virtuals: true,},toJSON: {virtuals: true,},});


const Product = mongoose.model('Product', productSchema);
module.exports = Product; 
