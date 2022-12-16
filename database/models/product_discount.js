'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        product_discount.hasOne(models.Product)
    }
  }
  product_discount.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    percent: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid: true,
    modelName: 'product_discount',
  });
  return product_discount;
};