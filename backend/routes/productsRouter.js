const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema, queryProductSchema} = require('../schemas/product.schema')

const router = express.Router();
const service = new ProductsService();



router.get(
    '/',
    validatorHandler(queryProductSchema, 'query'), // middleware de validación  
    async (req, res, next) => {
        try {
            const products = await service.find(req.query);
            res.status(200).json(products);
        } catch (error) {
            next(error)
        }

});

router.get(
    '/:id',  
    validatorHandler(getProductSchema, 'params'), // middleware de validación
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = await service.findOne(id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
)

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const body = req.body;        
        const newProduct = await service.create(body)
        res.status(201).json(newProduct);
})

router.patch('/:id', 
    validatorHandler(getProductSchema, 'params'), // valido el parametro id
    validatorHandler(updateProductSchema, 'body'), // validamos datos a actualizar
    async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const updatedProduct = await service.update(id, body);

            res.status(200).json({ 
                message: 'Actualización exitosa.', 
                data: updatedProduct 
            });
        } catch (error) {
            next(error); // Pasa el error al middleware de manejo
        }
    }
);

router.delete(
    '/:id',
    validatorHandler(deleteProductSchema,'params'),
    async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await service.delete(id);
    if (!deletedProduct) {
        return res.status(400).json({message: 'Producto no encontrado para eliminar.'})
    }
    res.status(200).json({ message: 'Producto eliminado con éxito.', data: deletedProduct });
})


module.exports = router;