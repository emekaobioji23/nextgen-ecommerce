const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String
},{
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  });

module.exports = addressSchema;