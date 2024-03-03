const { hashPassword, comparePassword} = require('../helpers/hashedPassword');
const { signToken, verifyToken } = require('../helpers/jwt');
const {User} = require('../models/index');
module.exports = class UserController {
  static async registerUser(req, res, next) {
    try {
      const newUser = await User.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Password,
        PhoneNumber: req.body.PhoneNumber,
        ImageURL: req.body.ImageURL
      })
      res.status(201).json(`User with email ${newUser.Email} has been created`)
    } catch (error) {
      console.log(error.errors[0].message, "Error check")
      next(error)
    }
  }
  static async getUserById(req,res,next){
    try {
      const findUserById = await User.findByPk(req.params.id)
      res.status(200).json(`User with name ${findUserById.FirstName} has already found`)
    } catch (error) {
      next(error)
    }
  }
  static async editDataUser(req,res,next){
    const id = +req.params.id
    console.log(id)
    try {
      const {FirstName,LastName,ImageURL } = req.body
      const updateDataUser = await User.update({
        FirstName,
        LastName,
        ImageURL
      },{
        where: {id}
      })
      res.status(200).json(`User with name ${updateDataUser} has already changed`)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async userLogin(req, res, next) {
    try {
      console.log(req.body.Email)
      //?cek email ada atau nggak
      if (!req.body.Email || !req.body.Password) {
        throw { name: 'Email/Password is required' }
      } else {
        const { Email, Password } = req.body
        const findUser = await User.findOne({
          where: {
            Email
          }
        })
        console.log(findUser, "<<< masuk ke compare");
        if (findUser === null) {
          throw { name: "InvalidLogin" }
        } else {
          //?compare dua hal Password yang dimasukkin sama di database
          const checkPassword = comparePassword(req.body.Password, findUser.Password)
          console.log(checkPassword, "<<< dari cek Password");
          if (!checkPassword) {
            throw { name: "invalidLogin" }
          } else {
            const access_token = signToken({
              id: findUser.id,
              Email: findUser.Email
            })
            console.log(access_token, "<<")
            res.status(200).json({
              access_token,
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  



}
