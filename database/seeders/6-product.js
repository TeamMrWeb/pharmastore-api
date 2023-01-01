"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
        {
            name: 'Toothpaste',
            description: 'Toothpaste',
            price: 100,
            inventoryId: 1,
            discountId: 1,
            categoryId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
