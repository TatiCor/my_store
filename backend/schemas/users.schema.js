const Joi = require('joi');

const id = Joi.number().integer().positive();
const email = Joi.string().min(3).required();
const password = Joi.string().min(8).required();
/* const role = Joi.string().min(5); para mas adelante usar con permisos */

const createUserSchema = Joi.object({
    email,
    password,
});

const updateUserSchema = Joi.object({
    password,
});

const getUserSchema = Joi.object({
    id: id.required()
});

module.exports = { createUserSchema, getUserSchema, updateUserSchema}