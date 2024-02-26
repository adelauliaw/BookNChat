'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomAvailability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomAvailability.belongsTo(models.Room, {foreignKey: "RoomID"})
    }
  }
  RoomAvailability.init({
    Date: {
      type: DataTypes.DATEONLY, // Use DATEONLY if you only care about the date
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    IsAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "IsAvailable cannot be null"
        },
      }
    },
    Reason: DataTypes.STRING, // Assuming no specific validation is needed for Reason
    RoomID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rooms', // Ensure this matches the table name generated by Sequelize
        key: 'id',
      },
      validate: {
        isInt: true,
        notNull: {
          msg: "RoomID cannot be null"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'RoomAvailability',
    indexes: [
      {
        unique: true,
        fields: ['RoomID', 'Date'] // This creates a unique constraint on the combination of RoomID and Date
      }
    ],
  });
  return RoomAvailability;
};
