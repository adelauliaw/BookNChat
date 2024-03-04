'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      PaymentDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      PaymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      BookingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Bookings", 
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
    await queryInterface.dropTable('Payments');
  }
};