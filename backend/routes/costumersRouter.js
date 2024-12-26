const express = require('express');
const CustomersService  = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema, deleteCustomerSchema } = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomersService();

router.get(
    '/',
    async(req, res, next) => {
        try {
            const customers = await service.find();
            res.status(200).json(customers);
        } catch (error) {
            next(error);
        }
    });

    router.get(
        '/:id',
        validatorHandler(getCustomerSchema, 'params'),
        async(req, res, next) => {
            try {
                const {id} = req.params;
                const customers = await service.findOne(id);
                res.status(200).json(customers);
            } catch (error) {
                next(error);
            }
        });

    router.post(
        '/',
        validatorHandler(createCustomerSchema, 'body'),
        async(req, res, next) => {
            try {
                const body = req.body;
                const newCustomer = await service.create(body);
                res.status(201).json(newCustomer);
            } catch (error) {
                next(error);
                
            }
        }
    );

    router.patch(
        '/:id',
        validatorHandler(getCustomerSchema, 'params'),
        validatorHandler(updateCustomerSchema, 'body'),
        async(req, res, next) => {
            try {
                const { id } = req.params;
                const body = req.body;
                const customerUpdated = await service.update(id, body);
                res.status(200).json({
                    message: 'Actualización exitosa.',
                    data: customerUpdated
                });
            } catch (error) {
                next(error);
            }
        }
    );

    router.delete(
        '/:id',
        validatorHandler(deleteCustomerSchema, 'params'),
        async(req, res, next) => {
            try {
                const { id } = req.params;
                await service.delete(id);
                res.status(200).json({
                    message: 'Cliente eliminado'
                });
            } catch (error) {
                next(error);
            }
        }
    );

    module.exports = router;