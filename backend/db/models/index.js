const { Product, ProductSchema } = require('./product.model');
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

// Setup de los modelos.
const setupModels = (sequelize) => {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));

    // Asociaciones DESPUÉS de la inicialización de TODOS los modelos
    User.associate(sequelize.models); // Asociaciones de User
    Customer.associate(sequelize.models); // Asociaciones de Customer
}


module.exports = setupModels;