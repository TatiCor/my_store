const express = require('express')
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter')
const customersRouter = require('./costumersRouter')
const categoriesRouter = require('./categoriesRouter')
const ordersRouter = require('./ordersRouter')


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router) // ruta madre.
    router.use('/products', productsRouter); // ruta para los productos.
    router.use('/categories', categoriesRouter); // ruta para las categorias.
    router.use('/customers', customersRouter); // ruta para los clientes.
    router.use('/users', usersRouter); // ruta para los usuarios.
    router.use('/orders', ordersRouter); // ruta para las ordenes.
}


module.exports = routerApi;