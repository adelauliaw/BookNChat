'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hotels = require('../database/hotels.json');
    for (let hotel of hotels) {
      delete hotel.id; // Assuming you want to remove an id property for some reason
      hotel.createdAt = new Date();
      hotel.updatedAt = new Date();
    }
    await queryInterface.bulkInsert('Hotels', hotels, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hotels', null, {});
  }
};
