const { Pool } = require('pg')

const { config } = require('../config/config')

let URI = '';
const options = {}

// Conexión con variables de entorno
if (config.isProd) {
    URI = config.dbUrl;
    options.connectionString = config.dbUrl;
    options.ssl = {
        rejectUnauthorized: false
    }
} else {
    const USER = encodeURIComponent(config.dbUser);
    const PASSWORD = encodeURIComponent(config.dbPassword);
    URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
    options.connectionString = URI;
}

const pool = new Pool(options);


module.exports = pool;