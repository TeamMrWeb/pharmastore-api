"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user_payments',
        [
            {
                userId: 1,
                payment_type: 'credit',
                provider: 'visa',
                account_no: 1234567890,
                expiry: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                payment_type: 'credit',
                provider: 'mastercard',
                account_no: 1234567890,
                expiry: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ],
        {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_payments', null, {});
  },
};
