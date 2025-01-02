const express = require('express');
const CategoriesService = require('../services/category.service');
const validatorHandler  = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema } = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res, next) => {
    try {
        const categories = await service.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

router.get(
    '/:id',
    validatorHandler(getCategorySchema, 'params'), 
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.findOne(id);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/',
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newCategory = await service.create(body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
            
        }
    }
);

router.patch(
    '/:id',
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const categoryUpdated = await service.update(id, body);
            res.status(200).json({
                message: 'Category updated successfully',
                data: categoryUpdated
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    '/:id',
    validatorHandler(deleteCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const categoryDeleted = await service.delete(id);
            res.status(200).json({
                message: 'Category deleted successfully',
                data: categoryDeleted
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;