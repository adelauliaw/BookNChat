const express = require('express')
const hotelController = require('../controllers/hotelController')
const hotelRouter = express.Router() 

hotelRouter.get('/', hotelController.fetchHotel)
hotelRouter.get('/rooms', hotelController.fetchRoom)
module.exports = hotelRouter