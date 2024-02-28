
const { Product, User } = require('../models/')
const authorization = async (req, res, next) => {
  const id = +req.params.id
  try {
    //?cek data products yang akan di delete dari product
    const products = await Product.findByPk(id)
    //?jika data productsnya tidak ada maka throw not found
    if (products === null) {
      throw { name: "notFound" }
    }
    //?validasi kepemilikan products
    console.log(req.user.id), "dari author";
    if (req.user.role === 'admin' || req.user.id === products.authorId) {
      next()
    } else {
      throw { name: "Forbidden" }
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
}
const authorizationForRole = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      next()
    } else {
      {
        throw { name: 'Forbidden' }
      }
    }
  } catch (error) {
    next(error)
  }

}
module.exports = { authorization, authorizationForRole }

