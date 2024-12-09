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

module.exports = { logErrors, boomErrorHandler, errorHandler };