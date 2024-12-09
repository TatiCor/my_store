/* const usersRouter = require('./usersRouter') */
const productsRouter = require('./productsRouter')
const express = require('express')

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router) // generamos una ruta madre.
/*     router.use('/users', usersRouter); */
    router.use('/products', productsRouter);
}


module.exports = routerApi;