'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      inventoryId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'product_inventories',
            key: 'id'
        }
      },
      discountId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'product_discounts',
            key: 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'product_categories',
            key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};