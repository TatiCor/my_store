const Joi = require('joi');
const { createUserSchema, updateUserSchema } = require('./users.schema');

const id = Joi.number().integer().positive().required();
const name = Joi.string().min(3).max(15);
const lastname = Joi.string().min(3).max(15);
const phone = Joi.string();


const createCustomerSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    phone: phone.required(),
    user: createUserSchema // user es un objeto con las propiedades de createUserSchema

});


const updateCustomerSchema = Joi.object({
    name,
    lastname,
    phone,
    user: updateUserSchema // user es un objeto con las propiedades de updateUserSchema
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