const express = require('express'); // importo express
const routerApi = require('./routes');
const app = express(); // instancio express
const port = process.env.PORT || 3000;
const { logErrors, sequelizeErrorHandler, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

// Middleware
app.use(express.json()); // parsea datos que recibimos en JSON del frontend

// Establezco ruta base
app.get('/', (req, res)=> {
    res.send('Bienvenidos a la api')
});

// llamamos al routerApi y le pasamos la app -- routing
routerApi(app); 

// middleware de errores.
app.use(logErrors);
app.use(sequelizeErrorHandler); // Maneja errores específicos de Sequelize
app.use(boomErrorHandler); // Maneja errores de Boom
app.use(errorHandler); // Maneja errores genéricos

// Levantar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})


