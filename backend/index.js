const express = require('express'); // importo express
const routerApi = require('./routes');
const app = express(); // instancio express
const port = process.env.PORT || 3000;
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

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
app.use(boomErrorHandler);
app.use(errorHandler);

// Levantar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})


