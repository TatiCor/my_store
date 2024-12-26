const { Model, DataTypes, Sequelize } = require('sequelize');

const {USER_TABLE} = require('./user.model');
const CUSTOMER_TABLE = 'customers'; 

// Schema: son distintos a los schemas de validación de entrada con Joi - Define la estructura de la BBDD
const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastname: {
        allowNull: false,
        type: DataTypes.STRING
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW'),
        type: DataTypes.DATE
    },
    // Relación con la tabla de usuarios
    userId: {
        field: 'user_id', // Nombre de la columna en la tabla
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
                
        references: {
            key: 'id', // Nombre de la columna referenciada
            model: USER_TABLE // Nombre de la tabla referenciada
        },
        onUpdate: 'CASCADE', // Acción a realizar cuando se actualiza el usuario
        onDelete: 'SET NULL' // Acción a realizar cuando se elimina el usuario
    }
}

class Customer extends Model {
    static associate(models) {
         // Aquí defines relaciones con otros modelos
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
    };
    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        }
    };
}


module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer};