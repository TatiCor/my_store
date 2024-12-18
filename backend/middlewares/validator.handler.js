const boom = require('@hapi/boom');

// Middleware: recibe schema y propiedad a validar
const validatorHandler = (schema, property) => {
    return (req, res, next) => {
        const data = req[property] // establecemos la data dinámica porque puede venir en body, params, query.  
        const{ error } = schema.validate(data, {abortEarly: false}) // para que me arroje todos los errores y no sólo el primero que encuentre
        
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    } 
}


module.exports = validatorHandler;