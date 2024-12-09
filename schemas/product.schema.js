const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().optional();
const image = Joi.string().uri().optional();


// Esquema para crear producto
const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image: image.required()
});

// Esquema para actualizar
const updateProductSchema = Joi.object({
    name,
    price,
    description,
    image
});

// Esquema para get: hacer consulta base de datos
const getProductSchema = Joi.object({
    id: id.required()
});

// es buena práctica dejarlo como objeto aunque tenga un sólo campo para que sea flexible.


module.exports = { createProductSchema, updateProductSchema, getProductSchema}