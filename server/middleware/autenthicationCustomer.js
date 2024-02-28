const { signToken, verifyToken } = require('../helpers/jwt')
const { Customer } = require('../models')

const autenthicationCustomer = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      {
        throw { name: 'invalidToken' }
      }
    }
    else {
      const codeToken = verifyToken(access_token)
      const checkUserInDatabase = await Customer.findOne({
        where: {
          email: codeToken.email
        }
      })
      if (!checkUserInDatabase) {
        {
          throw { name: 'invalidLogin' }
        }
      }
      else {
        req.customer = checkUserInDatabase
        next()
      }
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = autenthicationCustomer 