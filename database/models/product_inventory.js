'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        product_inventory.hasOne(models.Product)
    }
  }
  product_inventory.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'product_inventory',
  });
  return product_inventory;
};