const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TABLE = 'products';
const { CATEGORY_TABLE } = require('./category.model');

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
    categoryId: {
        type: DataTypes.INTEGER,
        field: 'category_id',
        allowNull: false, 
        references: {
            model: CATEGORY_TABLE, // Nombre de la tabla de categorías
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW')
    },
};
//- Define el modelo
class Product extends Model {
    static associate(models) {
        // Aquí defines relaciones entre modelos más adelante belongsTo
        this.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categoryId'
        });
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


module.exports = {Product, ProductSchema, PRODUCT_TABLE };