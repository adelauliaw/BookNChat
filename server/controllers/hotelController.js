const { Hotel, Room,Booking, sequelize, Sequelize } = require('../models');

module.exports = class HotelController{
  static async fetchHotel(req, res, next){
    try {
      const hotels = await Hotel.findAll({
        // where: { Address: req.body.Address },
        // include: [{
        //   model: Room,
        //   // where: {
        //   //   CheckInDate: { [Sequelize.Op.lte]: new Date(CheckInDate) },
        //   //   CheckOutDate: { [Sequelize.Op.gte]: new Date(CheckOutDate) }
        //   // },
        // }]
      });
  
      res.json({ hotels });
    } catch (error) {
      console.error("Error fetching hotels:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async fetchRoom(req, res, next){
    try {
      const room = await Room.findAll({
        // where: { Address: req.body.Address },
        // include: [{
        //   model: Room,
        //   // where: {
        //   //   CheckInDate: { [Sequelize.Op.lte]: new Date(CheckInDate) },
        //   //   CheckOutDate: { [Sequelize.Op.gte]: new Date(CheckOutDate) }
        //   // },
        // }]
      });
  
      res.json({ room });
    } catch (error) {
      console.error("Error fetching hotels:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}