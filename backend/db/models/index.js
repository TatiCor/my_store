const { Product, ProductSchema } = require('./product.model');
const { User, UserSchema } = require('./user.model');

// Setup de los modelos.
const setupModels = (sequelize) => {
    User.init(UserSchema, User.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
}


module.exports = setupModels;