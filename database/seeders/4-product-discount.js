"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /* await queryInterface.bulkInsert('product_discounts', [
            {
                name: 'Christmas Sale',
                description: '10% off',
                percent: 10,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {
            ignoreDuplicates: true,
        });
    */
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('product_discounts', null, {});
  },
};
