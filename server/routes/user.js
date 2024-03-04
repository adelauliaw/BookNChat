const express = require('express')
const UserController = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const userRouter = express.Router() 

userRouter.post('/register', UserController.registerUser)
userRouter.post('/login', UserController.userLogin)
userRouter.use(authentication)
userRouter.get('/rooms', UserController.fetchBookingRoomByUser)
userRouter.get('/:id', UserController.getUserById)
userRouter.put('/:id', UserController.editDataUser)

module.exports = userRouter