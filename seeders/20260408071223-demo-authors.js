'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkInsert('Authors', [{
        name: 'Joe Mama',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('Authors', [{
        name: 'Lil Ligga',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('Authors', [{
        name: 'Mike Hunt',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Authors', null, {});
  }
};
