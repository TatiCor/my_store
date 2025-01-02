/* const usersRouter = require('./usersRouter') */
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter')
const customersRouter = require('./costumersRouter')
const categoriesRouter = require('./categoriesRouter')
const express = require('express')

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router) // ruta madre.
    router.use('/products', productsRouter); // ruta para los productos.
    router.use('/categories', categoriesRouter); // ruta para las categorias.
    router.use('/customers', customersRouter); // ruta para los clientes.
    router.use('/users', usersRouter); // ruta para los usuarios.
}


module.exports = routerApi;