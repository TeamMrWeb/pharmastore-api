"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
        {
            name: 'Shampoo',
            description: 'Shampoo for hair!!',
            price: 100,
            categoryId: 1,
            inventoryId: 0,
            // discountId: 1, // NOTE: use the product-discount seeder to make a relationship between products and discounts
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Toothbrush',
            description: 'Toothbrush',
            price: 100,
            categoryId: 2,
            inventoryId: 0,
            // discountId: 1, // NOTE: use the product-discount seeder to make a relationship between products and discounts
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ], {
        ignoreDuplicates: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
