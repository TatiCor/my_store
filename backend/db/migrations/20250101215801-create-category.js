const { DataTypes } = require('sequelize');
const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE,  {
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
          }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
