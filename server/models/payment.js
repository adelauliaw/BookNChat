'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Booking, {foreignKey: 'id'});
    }
  }
  Payment.init({
    Amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Amount must be an integer"
        },
        min: {
          args: [1],
          msg: "Amount must be at least 1"
        },
      }
    },
    PaymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Must be a valid date"
        }
      }
    },
    PaymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Payment method cannot be empty"
        },
        isIn: {
          args: [['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer']],
          msg: "Invalid payment method"
        }
      }
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Status cannot be empty"
        },
        isIn: {
          args: [['Pending', 'Completed', 'Failed']],
          msg: "Invalid status"
        }
      }
    },
    // BookingId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   unique: true, // This assumes a one-to-one relationship between Payment and Booking
    //   references: {
    //     model: 'Bookings',
    //     key: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};
