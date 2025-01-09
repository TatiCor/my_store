const Joi = require('joi');

const id = Joi.number().integer().positive();
const customerId = Joi.number().integer().positive();
const productId = Joi.number().integer().positive();
const orderId = Joi.number().integer().positive();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
    customerId: customerId.required(),
});

const getOrderSchema = Joi.object({ 
    id: id.required()
});

const addItemSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required()
});


module.exports = { createOrderSchema, getOrderSchema, addItemSchema };