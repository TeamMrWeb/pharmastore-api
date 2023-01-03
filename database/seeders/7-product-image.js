"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_images', [
        {
            productId: 1,
            url: '',
            name: 'Toothpaste',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            productId: 1,
            url: '',
            name: 'Toothpaste',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {
        ignoreDuplicates: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_images', null, {});
  },
};
