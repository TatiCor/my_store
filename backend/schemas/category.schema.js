const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(15);
const image = Joi.string().min(3);

const createCategorySchema = Joi.object({
    name: name.required(),
    image: image.required()
});

const updateCategorySchema = Joi.object({
    name: name,
    image: image
});

const getCategorySchema = Joi.object({
    id: id.required()
});

const deleteCategorySchema = Joi.object({
    id: id.required(),
/*     role: id.required() */
});


module.exports = {
    createCategorySchema,
    updateCategorySchema,
    getCategorySchema,
    deleteCategorySchema
}