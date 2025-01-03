const express = require('express'); 
const validatorHandler = require('../middlewares/validator.handler')
const { getOrderSchema, createOrderSchema } = require('../schemas/order.schema'); // esquemas de validación
const OrdersService = require('../services/order.service'); // servicio

const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res) => {
    const orders = await service.find();
    res.json(orders);
});

router.get(
    '/:id', 
    validatorHandler(getOrderSchema, 'params'), 
    async (req, res) => {
        const { id } = req.params;
        const order = await service.findOne(id);
        res.status(200).json(order);
});

router.post(
    '/',
    validatorHandler(createOrderSchema, 'body'),
    async (req, res) => {
        const body = req.body;
        const newOrder = await service.create(body);
        res.status(201).json(newOrder);
    }
);


module.exports = router;