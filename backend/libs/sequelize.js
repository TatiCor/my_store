const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize( URI, {
    dialect: 'mysql',
    logging: console.log,
});

setupModels(sequelize);

sequelize.sync({ alter: true })
    .then(() => console.log("Tablas sincronizadas"))
    .catch(err => console.error("Error al sincronizar tablas:", err));


module.exports = sequelize;

