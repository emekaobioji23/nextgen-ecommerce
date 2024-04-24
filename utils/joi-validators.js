const Joi = require('joi')
const catchAsync=require("../utils/catch-async")
const Econsole = require("../utils/Econsole-log")

exports.validateProduct = catchAsync(async (req, res, next) => {
    const myconsole = new Econsole("joi-validators.js", "validateProduct", "")
    myconsole.log("entry")
    //myconsole.log(req)
    const { name, description, richDescription, images, price, discount, rating, quantity, isAvailable } = req.body;
    const sellerId = req.user.id;
    req.body.sellerId = sellerId
    console.log(name, description, richDescription, images, price, discount, rating, quantity, isAvailable, sellerId)
    const obj = { name, description, richDescription, images, price, discount, rating, quantity, isAvailable, sellerId }
    var expectedProductProperties = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        richDescription: Joi.string().required(),
        images: Joi.array().items(Joi.string()).min(1).required(),
        price: Joi.number().required(),
        discount: Joi.number().min(0).max(100).optional(),
        rating: Joi.number().min(0).max(5).required(),
        quantity: Joi.number().required(),
        isAvailable: Joi.boolean().required(),
        sellerId: Joi.string().hex().length(24).required()
    })
    const { error } = expectedProductProperties.validate(obj)
    if (error) { myconsole.log(error.message);res.json({ errorMessage: error.message });return error.message; } else { myconsole.log("exits"), next() }
});
