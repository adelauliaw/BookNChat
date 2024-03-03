const { signToken, verifyToken } = require('../helpers/jwt')
const { User } = require('../models/')

const authentication = async (req, res, next) => {
  console.log("masuk sini")
  try {
    //?cek token ada atau nggak lu bawa id card dikalungin 
    const { access_token } = req.headers
    if (!access_token) {
      throw { name: "invalidToken" }
    } else {
      //?token yang dibawa itu sesuai dengan yang udah diverify atau nggak sesuai yang kita punya
      const verify = verifyToken(access_token)
      //?user ini ada didatabase atau nggak
      console.log(verify)
      const findUser = await User.findOne({
        where: {
          Email: verify.Email
        }
      })
      if (!findUser) {
        console.log(findUser);
        throw { name: "invalidToken" }
      } else {
        //? beri informasi ke siaapa yang mau login//biar bisa dilanjutin
        req.user = findUser
        //kita bisa dapatin informasi dari sini dan bisa dilanjutkan data ini ke server
        next()
      }
    }
  } catch (error) {
    console.log(error, "masuk sini error invalid");
    next(error)
  }

}




module.exports = authentication