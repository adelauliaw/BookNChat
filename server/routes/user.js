const express = require('express')
const UserController = require('../controllers/userController')
const userRouter = express.Router() 

userRouter.post('/register', UserController.registerUser)
userRouter.get('/:id', UserController.getUserById)
userRouter.put('/:id', UserController.editDataUser)
userRouter.post('/login', UserController.userLogin)
module.exports = userRouter