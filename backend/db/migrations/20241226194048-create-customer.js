'use strict';
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE, {
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
          }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
