const { Hotel, Room,Booking, sequelize, Sequelize } = require('../models');

module.exports = class HotelController{
  static async fetchHotel(req, res, next){
    try {
      const hotels = await Hotel.findAll({
        // where: { Address: req.body.Address },
        include: [{
          model: Room,
        }]
      });
  
      res.json({ hotels });
    } catch (error) {
      next
    }
  }

}