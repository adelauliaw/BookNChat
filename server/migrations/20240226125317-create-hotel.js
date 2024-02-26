'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Amenities: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ImageURL: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hotels');
  }
};