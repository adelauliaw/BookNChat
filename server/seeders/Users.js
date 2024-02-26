'use strict';

const { hashPassword } = require('../helpers/hashedPassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require('../database/users.json');
    for (let user of users) {
      delete user.id; // Assuming you want to remove an id property for some reason
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.Password = await hashPassword(user.Password); // Assuming the property name is PasswordHash and hashPassword is async
    }
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
