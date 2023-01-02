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
        // 1:1
        Product.belongsTo(models.product_category, { foreignKey: 'categoryId' });
        Product.belongsTo(models.product_discount, { foreignKey: 'discountId' });
        Product.belongsTo(models.product_inventory, { foreignKey: 'inventoryId' });

        // 1:N
        Product.hasMany(models.product_image, { as: 'images' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    rating: DataTypes.INTEGER,
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