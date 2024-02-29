const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const hotelRouter = require('./hotel');


router.use('/users', userRouter)
router.use('/hotels', hotelRouter)





module.exports = router