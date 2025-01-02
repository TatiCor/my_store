'use strict';
const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('../models/product.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', {
        field: 'category_id', // Nombre de la columna en la tabla
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(PRODUCT_TABLE, 'category_id');
  }
};
