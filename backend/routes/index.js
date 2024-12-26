/* const usersRouter = require('./usersRouter') */
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter')
const customersRouter = require('./costumersRouter')
const express = require('express')

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router) // ruta madre.
    router.use('/users', usersRouter); // ruta para los usuarios.
    router.use('/products', productsRouter); // ruta para los productos.
    router.use('/customers', customersRouter); // ruta para los clientes.
}


module.exports = routerApi;