"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_categories', [
        {
            name: 'Hygiene',
            description: 'Hygiene products',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Accessories',
            description: 'Accessories',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {
        ignoreDuplicates: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', null, {});
  },
};
