'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        product_image.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }
  product_image.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_image',
  });
  return product_image;
};