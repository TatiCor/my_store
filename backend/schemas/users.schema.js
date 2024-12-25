const Joi = require('joi');

const id = Joi.number().integer().positive();
const email = Joi.string().min(3).required();
const password = Joi.string().min(8).required();
const role = Joi.string().min(5).required(); 

const createUserSchema = Joi.object({
    email,
    password,
    role
});

const updateUserSchema = Joi.object({
    password,
    role
});

const getUserSchema = Joi.object({
    id: id.required()
});

const deleteUserSchema = Joi.object({
    id: id.required()
});

module.exports = { 
    createUserSchema, 
    getUserSchema, 
    updateUserSchema, 
    deleteUserSchema
}