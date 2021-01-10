'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Carts.init({
    cartsInfoStr: DataTypes.STRING,
    billName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    location: DataTypes.STRING,
    totalPrice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};


