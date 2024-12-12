const boom = require('@hapi/boom');

const  getConecction = require('../libs/postgres'); // Client
const pool = require('../libs/postgres.pool') // Pool

// Entidades: Creamos una clase con el servicio - lógica del negocio
class ProductsService {
    constructor(){
        this.pool = pool;
        this.pool.on('error', (err) => console.error(err)) // manejo de error en pool
    }
    // Funciones - lógica de la app. 
    async find() {
/*      const products = this.products
        return products; -- SIN BBDD*/

        const query = 'SELECT * FROM products'
        const result = await this.pool.query(query)
        return result.rows
    }

    async findOne(id) {
        const product = this.products.find(item => item.id === id);
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
        const newProduct = {
            id: faker.string.uuid(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async update(id, data) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Producto no encontrado.');
        }
        
        this.products[index] = { 
            ...this.products[index],
            ...data
        }        
        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex(producto => producto.id === id);
        if (index === -1) {
            throw boom.notFound('Producto no encontrado.');  // Retorna null si el producto no existe
        }
        const deletedProduct = this.products.splice(index, 1);  // Elimina el producto
        return deletedProduct[0];
    }   
}

module.exports = ProductsService;