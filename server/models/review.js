'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Corrected the association to Hotel
      Review.belongsTo(models.Hotel, { foreignKey: 'HotelID' });
      Review.belongsTo(models.User, { foreignKey: 'UserID' });
    }
  }
  Review.init({
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Rating must be an integer",
        },
        min: {
          args: [1],
          msg: "Rating must be at least 1",
        },
        max: {
          args: [5],
          msg: "Rating can not be more than 5",
        },
      }
    },
    Comment: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Comment cannot be empty",
        },
      }
    },
    DatePosted: { // Assuming a typo in "DataPosted", corrected to "DatePosted"
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    HotelID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Hotels', // Assuming 'Hotels' is the table name
        key: 'id',
      }
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming 'Users' is the table name
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
