'use strict';
const { DataTypes } = require('sequelize');
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model');
const { ORDER_TABLE } = require('../models/order.model');
const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
      orderId: {
          type: DataTypes.INTEGER,
          field: 'order_id',
          allowNull: false,
          references: {
              model: ORDER_TABLE,
              key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      productId: {
          type: DataTypes.INTEGER,
          field: 'product_id',
          allowNull: false,
          references: {
              model: PRODUCT_TABLE,
              key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      },
      amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: 'create_at',
          defaultValue: Sequelize.fn('NOW')
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
