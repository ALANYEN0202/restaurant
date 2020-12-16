'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    productsname: DataTypes.STRING,
    imgurl: DataTypes.STRING,
    prices: DataTypes.INTEGER,
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};