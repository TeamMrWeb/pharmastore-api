'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Product.hasOne(models.product_inventory, { foreignKey: 'inventoryId' });
        Product.hasOne(models.product_discount, { foreignKey: 'discountId' });
        Product.belongsTo(models.product_category, { foreignKey: 'categoryId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    inventoryId: DataTypes.INTEGER,
    discountId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Product',
  });
  return Product;
};