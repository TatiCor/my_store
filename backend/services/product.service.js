/* Conexiones nativas */
const  getConecction = require('../libs/postgres'); // Client
const pool = require('../libs/postgres.pool') // Pool

const { models } = require('../libs/sequelize')

// Entidades: Creamos una clase con el servicio - lógica del negocio
class ProductsService {
    constructor(){ }
    // Funciones - lógica de la app. 
    async find() {
/*      const products = this.products
        return products; -- SIN BBDD*/

        // Sin ORM
/*      const query = 'SELECT * FROM products'
        const result = await this.pool.query(query)
        return result.rows */

        // Con ORM
        const rta = await models.Product.findAll()
        return rta
        
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
        if (!productToUpdate) {
            throw boom.notFound('Producto no encontrado.');
        }
        const productUpdated = await productToUpdate.update(changes)
        return productUpdated;
    }

    async delete(id) {
        const productToDelete = await this.findOne(id);
        if (!productToDelete) {
            throw boom.notFound('Producto no encontrado.');  // Retorna null si el producto no existe
        }
        await productToDelete.destroy();
        return { id }
    }   
}

module.exports = ProductsService;