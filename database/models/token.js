'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Token.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Token.init({
    token: DataTypes.STRING,
    type: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    blacklisted: DataTypes.BOOLEAN,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Token',
  });
  return Token;
};