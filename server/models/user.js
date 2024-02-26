'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Review, {foreignKey: "UserID"})
      User.hasMany(models.Booking, {foreignKey: "BookingID"})
    }
  }
  User.init({
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required",
        },
      },
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required",
        },
      },
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique",
      },
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
        notEmpty: {
          msg: "Email is required",
        },
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required",
        },
      },
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          msg: "Phone number must contain only numbers",
        },
        len: {
          args: [10, 14],
          msg: "Phone number must be between 10 and 14 digits",
        },
      },
    },
    ImageURL: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "Must be a valid URL",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
