'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lottery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lottery.init({
    prizename: DataTypes.STRING,
    imgurl: DataTypes.STRING,
    chances: DataTypes.INTEGER,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lottery',
  });
  return Lottery;
};