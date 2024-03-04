const { comparePassword} = require('../helpers/hashedPassword');
const { signToken, verifyToken } = require('../helpers/jwt');
const booking = require('../models/booking');
const {User, Room, Booking} = require('../models/index');
module.exports = class UserController {
  static async registerUser(req, res, next) {
    try {
      const checkPhoneNumber = req.body.PhoneNumber;
      const checkPassword = req.body.Password;
      if (!/^[0-9]+$/.test(checkPhoneNumber) || !checkPhoneNumber.startsWith('08')) {
        throw {name: "invalidPhoneNumber"}
      }
      // const hasSpecialChars = /[~!@#$%^&*()))_+-={}|:"><?[]\;',.`]+/.test(checkPassword);
      // const hasCapitalLetter = /[A-Z]+/.test(checkPassword);
      // if (!hasSpecialChars || !hasCapitalLetter) {
      //   throw {name: "invalidPassword"}
      // }
      const newUser = await User.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Password,
        PhoneNumber: req.body.PhoneNumber,
        ImageURL: req.body.ImageURL
      });
      res.status(201).json(`User with email ${newUser.Email} has been created`);
    } catch (error) {
      next(error);
    }
  }  
  static async userLogin(req, res, next) {
    try {
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
            res.status(200).json({
              access_token,
              Email,
            })
          }
        }
      }
    } catch (error) {
      console.log(error);
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
  static async fetchBookingRoomByUser(req, res, next){
    try {
      const {id} = req.user
      const findUser = await User.findAll({
        include: [{
            model: Booking,
            where: {
                UserID: id/// Filter by UserId from request
            }
        }]
    });
    console.log(id, findUser)
      res.status(200).json(findUser)
    } catch (error) {
      console.log(error)
    }
  }

  



}
