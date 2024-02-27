'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Room)
      Hotel.hasMany(models.Review)
      // Hotel.hasMany(models.HotelFacilities)
    }
  }
  Hotel.init({
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Hotel name must be unique.'
      },
      validate: {
        notNull: {
          msg: 'Hotel name is required'
        },
        notEmpty: {
          msg: 'Hotel name cannot be empty'
        },
      }
    },
    Address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Address cannot be empty'
        },
      }
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Phone number must be unique.'
      },
      validate: {
        notEmpty: {
          msg: 'Phone number cannot be empty'
        },
        isNumeric: {
          msg: 'Phone number must contain only numbers'
        },
      }
    },
    Description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty'
        },
      }
    },
    Amenities: DataTypes.STRING, // Consider adding validation if needed
    Rating: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Rating must be an integer'
        },
        min: {
          args: 1,
          msg: 'Rating must be at least 1'
        },
        max: {
          args: 5,
          msg: 'Rating cannot be more than 5'
        },
      }
    },
    ImageURL: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'Must be a valid URL'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};