const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';
// Estructura de la tabla
const OrderSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.INTEGER,
        field: 'customer_id',
        allowNull: false,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    total: {
        type: DataTypes.VIRTUAL, // No se almacena en la base de datos
        get() {
            if (this.items && this.items.length > 0) {
                return this.items.reduce((total, item) => total + (item.price * item.OrderProduct.amount), 0);
                
            }
            return 0;
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW')
    }
};

// Modelo de la tabla
class Order extends Model {
    
    static associate(models) {
        // relaciones entre modelos más adelante - hasMany product
        this.belongsTo(models.Customer, {
            as: 'customer',
            foreignKey: 'customerId'
        })
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct, // Nombre del modelo intermedio
            foreignKey: 'orderId', // Llave foránea en la tabla intermedia
            otherKey: 'productId', // Llave foránea del otro modelo
        });
    };

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
    };
}

module.exports = { Order, OrderSchema, ORDER_TABLE };