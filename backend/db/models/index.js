const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');

// Setup de los modelos.
const setupModels = (sequelize) => {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));

    // Asociaciones DESPUÉS de la inicialización de TODOS los modelos
    User.associate(sequelize.models); // Asociaciones de User
    Customer.associate(sequelize.models); // Asociaciones de Customer
    Category.associate(sequelize.models); // Asociaciones de Category
    Product.associate(sequelize.models); // Asociaciones de Product
}


module.exports = setupModels;