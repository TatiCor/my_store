const Joi = require('joi');

const id = Joi.number().integer().positive();
const customerId = Joi.number().integer().positive();

const createOrderSchema = Joi.object({
    customerId: customerId.required(),
});

const getOrderSchema = Joi.object({ 
    id: id.required()
});

module.exports = { createOrderSchema, getOrderSchema };