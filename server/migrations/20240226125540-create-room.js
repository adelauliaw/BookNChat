'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      MaxOccupancy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Amenities: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageURL: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      HotelID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Hotels", // 'Actors' would also work
          key: 'id'
        }
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
    await queryInterface.dropTable('Rooms');
  }
};