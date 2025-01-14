const { Client } = require('pg')

// Conexión sin variables de entorno
const getConecction = async () => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'tati',
        password: 'admin123',
        database: 'my_store'
    });
    await client.connect();    
    return client;
};

module.exports = getConecction;