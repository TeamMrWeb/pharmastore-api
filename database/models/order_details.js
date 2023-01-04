'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_details.hasOne(models.order_items)
        
      order_details.belongsTo(models.User, { foreignKey: 'userId' });
      order_details.belongsTo(models.payment_details, { foreignKey: 'paymentId' });
    }
  }
  order_details.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_details',
  });
  return order_details;
};