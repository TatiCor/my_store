const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';
// Estructura de la tabla
const CategorySchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW')
    },
};

// Modelo de la tabla
class Category extends Model {
    
    static associate(models) {
        // relaciones entre modelos más adelante - hasMany product
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId'
        });
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    };
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };