'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CheckInDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      CheckOutDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      TotalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", 
          key: 'id'
        }
      },
      RoomID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Rooms", 
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
    await queryInterface.dropTable('Bookings');
  }
};