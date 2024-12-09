const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

// Entidades: Creamos una clase con el servicio - lógica del negocio
class ProductsService {
    constructor(){
        this.products = []; // Repositorio local - simula bbdd
        this.generate(); // generamos productos con faker
    }
    // Funciones - lógica de la app. 
    generate() {
        const numberOfProducts = 10;

        for (let i = 0; i < numberOfProducts; i++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                image: faker.image.url()
            });
        }
    }

    async find() {
        const products = this.products
        return new Promise (resolve => {
            setTimeout(()=>{
                resolve(products)
            }, 3000);
        }) 
    }

    async findOne(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw boom.notFound('Producto no encontrado.')
        } 
        return product;
    }

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