'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Hotel, { foreignKey: 'HotelId' }); // Ensure this matches your model name and foreignKey
      Room.hasMany(models.RoomAvailability, {foreignKey: "RoomID"})
      Room.hasMany(models.RoomFacility, {foreignKey: "RoomID"})
      Room.hasMany(models.Booking, {foreignKey: "RoomID"})
    }
  }
  Room.init({
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Type cannot be empty",
        },
      },
      unique: 'uniqueRoomTypePerHotel'
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Price must be an integer",
        },
        min: {
          args: [0],
          msg: "Price must be greater than or equal to 0",
        },
      }
    },
    MaxOccupancy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Max Occupancy must be an integer",
        },
        min: {
          args: [1],
          msg: "Max Occupancy must be at least 1",
        },
      }
    },
    Amenities: DataTypes.STRING, // Add validation as needed
    imageURL: DataTypes.STRING, // Add validation as needed for URLs
    HotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "HotelId must be an integer",
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Room',
    indexes: [
      // Creates a unique constraint for Type and HotelID
      {
        name: 'uniqueRoomTypePerHotel',
        unique: true,
        fields: ['Type', 'HotelID']
      },
    ],
  });
  return Room;
};
