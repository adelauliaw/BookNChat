'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bookings = require('../database/bookings.json');
    for (let booking of bookings) {
      delete booking.id; // Assuming you want to remove an id property for some reason
      booking.createdAt = new Date();
      booking.updatedAt = new Date();
    }
    await queryInterface.bulkInsert('Bookings', bookings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
