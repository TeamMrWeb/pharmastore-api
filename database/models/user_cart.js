'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        user_cart.belongsTo(models.User, { foreignKey: 'userId' })
        user_cart.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  }
  user_cart.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_cart',
  });
  return user_cart;
};