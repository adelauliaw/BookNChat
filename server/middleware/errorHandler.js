const errorHandler = (error, req, res, next) => {
  console.log(error, "<<<<<<<<<<<");
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    res.status(400).json({
      msg: error.errors[0].message,
    })
  } else if (error.name === 'invalidLogin') {
    res.status(401).json({
      msg: 'Invalid email/password'
    })
  } else if (error.name === 'notFound') {
    res.status(404).json({
      msg: 'Product not Found'
    })
  } else if (error.name === 'Email/Passwordisrequired') {
    res.status(400).json({
      msg: 'Email / Password is required'
    })
  } else if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      msg: 'jwt error'
    })
  } else if (error.name === 'invalidToken') {
    res.status(401).json({
      msg: 'token invalid'
    })
  } else if (error.name === 'Forbidden') {
    res.status(403).json({
      msg: 'Forbidden'
    })
  } else {
    console.log(error)
    res.status(500).json({
      msg: 'Internal Server Error'
    })
  }
}

module.exports = errorHandler