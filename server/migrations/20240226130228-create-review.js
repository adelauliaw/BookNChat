'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DatePosted: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      HotelID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Hotels", 
          key: 'id'
        }
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", 
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
    await queryInterface.dropTable('Reviews');
  }
};