'use strict';
const { DataTypes } = require('sequelize');
const { ORDER_TABLE } = require('../models/order.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_TABLE, {
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
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: 'create_at',
          defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
