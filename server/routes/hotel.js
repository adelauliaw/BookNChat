const express = require('express')
const hotelController = require('../controllers/hotelController')
const hotelRouter = express.Router() 

hotelRouter.get('/', hotelController.fetchHotel)

module.exports = hotelRouter