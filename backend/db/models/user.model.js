const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users'; 

// Schema: son distintos a los schemas de validación de entrada con Joi - Define la estructura de la BBDD
const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
    },
    createdAt: {
        allowNull: false,
        field: 'create_at',
        defaultValue: Sequelize.fn('NOW'),
        type: DataTypes.DATE
    },

}

class User extends Model {
    static associate() {
         // Aquí defines relaciones entre modelos más adelante
    };
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    };
}


module.exports = { USER_TABLE, UserSchema, User};