'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'UserID' });
      Booking.belongsTo(models.Room, { foreignKey: 'RoomID' }); // Assuming the model name is Room
      Booking.hasMany(models.Payment);
    }
  }
  Booking.init({
    CheckInDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CheckOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Must be a valid date",
        },
        isAfter: {
          args: String(new Date()),
          msg: "Check out date must be in the future",
        },
      }
    },
    TotalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Total price must be an integer",
        },
        min: {
          args: [0],
          msg: "Total price must be zero or positive",
        },
      }
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Status is required",
        },
      }
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    RoomID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rooms', // Ensure this matches your actual Room model's table name
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
