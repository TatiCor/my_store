const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';

//- Define la estructura de la BBDD
const ProductSchema = {  
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true 
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true 
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW')

    },

}
class Product extends Model {
    static associate() {
             // Aquí defines relaciones entre modelos más adelante
        };
        static config(sequelize) {
            return {
                sequelize,
                tableName: PRODUCT_TABLE,
                modelName: 'Product',
                timestamps: false
            }
        };
}


module.exports = {PRODUCT_TABLE, ProductSchema, Product };