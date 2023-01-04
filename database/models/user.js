'use strict';
const {
  Model
} = require('sequelize');
const cryptService = require('../../services/crypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.belongsTo(models.Roles, { foreignKey: 'roleId' })
        User.hasMany(models.Token)

        User.hasOne(models.order_details)
    }
    static hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    avatar: DataTypes.STRING,
    telephone: {
        type: DataTypes.STRING,
        unique: true
    },
    isBetaMember: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
        beforeCreate: async (user) => {
            user.password = await cryptService.hashPassword(user.password);
            console.log(user.password)
        }
    }
  },);
  return User;
};