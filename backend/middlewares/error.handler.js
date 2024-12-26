const { ValidationError, UniqueConstraintError } = require('sequelize'); // para errores si creamos el mismo mail.

// Middleware para registrar errores
const logErrors = (err, req, res, next) => {
    console.error(err.stack);
    next(err); // Pasa el error al siguiente middleware
};

// Middleware específico para manejar errores de Boom
const boomErrorHandler = (err, req, res, next) => {
    if (err.isBoom) {
        const { output } = err; // Extrae la respuesta de Boom
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err); // Pasa el error al siguiente middleware si no es de Boom
    }
};

// Middleware genérico para manejar otros errores
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        // stack: err.stack // Descomentar para debug (no en producción)
    });
};

const sequelizeErrorHandler = (err, req, res, next) => {
    if (err instanceof UniqueConstraintError) {
        res.status(409).json({
            statusCode: 409,
            error: 'Bad Request',
            message: `El usuario ya está registrado: ${err.errors[0].value}`,
        });
    } else if (err instanceof ValidationError) {
        res.status(400).json({
            statusCode: 400,
            error: 'Bad Request',
            message: err.errors.map(e => e.message).join(', '),
        });
    } else {
        next(err); // Pasa al siguiente middleware si no es un error de Sequelize
    }
};

module.exports = { 
    logErrors, 
    sequelizeErrorHandler,
    boomErrorHandler, 
    errorHandler 
};