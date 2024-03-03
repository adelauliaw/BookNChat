'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rooms = require('../database/rooms.json');
    for (let room of rooms) {
      delete room.id; // Assuming you want to remove an id property for some reason
      room.createdAt = new Date();
      room.updatedAt = new Date();
    }
    await queryInterface.bulkInsert('Rooms', rooms, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};
