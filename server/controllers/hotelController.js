const {Hotel} = require('../models/index');

module.exports = class HotelController{
  static async fetchHotel(req, res, next){
    try {
      const getDataHotels = await Hotel.findAll()
      res.status(200).json(getDataHotels)
      // console.log(getDataHotels, "<<hotel")
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}