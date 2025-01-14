'use strict';
const {CUSTOMER_TABLE } = require('../models/customer.model');
const {USER_TABLE } = require('../models/user.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CUSTOMER_TABLE, 'user_id', 
      // Relación con la tabla de usuarios
    { 
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'user_id');
  }
};
