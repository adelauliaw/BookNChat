'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HotelFacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HotelFacility.belongsTo(models.Hotel, {foreignKey: "HotelID"})
    }
  }
  HotelFacility.init({
    Name: DataTypes.STRING,
    Description: DataTypes.STRING,
    HotelID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Hotels',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }
  }, {
    sequelize,
    modelName: 'HotelFacility',
  });
  return HotelFacility;
};