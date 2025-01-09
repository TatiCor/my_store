/* Conexiones nativas */
const  getConecction = require('../libs/postgres'); // Client
const pool = require('../libs/postgres.pool') // Pool

const { models } = require('../libs/sequelize') // ORM
const boom = require('@hapi/boom');


// Entidades: Creamos una clase con el servicio - lógica del negocio
class ProductsService {
    constructor(){ }
    // Funciones - lógica de la app. 
    async find(query) {
        // Con ORM
        const options = {
            include: ['category']  // array con asociaciones a incluir
        };
        const { limit, offset } = query; // datos para paginación
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const products = await models.Product.findAll(options)
        return products
        
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.notFound('Producto no encontrado.')
        } 
        return product;
    }

/*     async findWithPool() {
        const query = 'SELECT * FROM products'
        const result = await this.pool(query)
        return result.rows
    }  */

/*     async findWithClient () {
        const client = getConecction();
        try {
            const query = 'SELECT * FROM products';
            const result = (await client).query(query);
            return result.rows;
        } finally {
            client.end(); // Siempre cerramos la conexión
        }
    } */

    async create(data) {
        const newProduct = await models.Product.create(data);        
        return newProduct;
    }

    async update(id, changes) {
        const productToUpdate = await this.findOne(id);
        const productUpdated = await productToUpdate.update(changes)
        return productUpdated;
    }

    async delete(id) {
        const productToDelete = await this.findOne(id);
        await productToDelete.destroy();
        return { id }
    }   
}

module.exports = ProductsService;