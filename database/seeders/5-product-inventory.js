"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_inventories', [
        {
            quantity: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            quantity: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {
        ignoreDuplicates: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_inventories', null, {});
  },
};
