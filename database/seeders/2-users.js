'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Elon',
          lastName: 'Musk',
          password: '123456',
          email: 'elonmusk@gmail.com',
          telephone: '1234567890',
          avatar:
            'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          isBetaMember: true,
          isVerified: true,
          roleId: 1, // admin note, NOTE: This is the foreign key, first RUN the 1-roles.js seeder
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Jeff',
          lastName: 'Bezos',
          password: '123456',
          email: 'jeffbezos@gmail.com',
          telephone: '2234567890',
          avatar:
            'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          isBetaMember: true,
          isVerified: true,
          roleId: 2, // user role NOTE: This is the foreign key, first RUN the 1-roles.js seeder
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
