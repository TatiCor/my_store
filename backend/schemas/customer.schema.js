const Joi = require('joi');

const id = Joi.number().integer().positive().required();
const name = Joi.string().min(3).max(15);
const lastname = Joi.string().min(3).max(15);
const phone = Joi.string();
const userId = Joi.number().integer().positive()

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    phone: phone.required(),
    userId: userId.required()
});


const updateCustomerSchema = Joi.object({
    name,
    lastname,
    phone
});

const getCustomerSchema = Joi.object({
    id
});

const deleteCustomerSchema = Joi.object({
    id
});

module.exports = { 
    createCustomerSchema, 
    updateCustomerSchema,
    getCustomerSchema,
    deleteCustomerSchema
}