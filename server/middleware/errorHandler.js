const errorHandler = (error, req, res, next) => {
  console.log(error, "<<<<<<<<<<<");
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    res.status(400).json({
      msg: error.errors[0].message,
    })
  } else {
    console.log(error)
    res.status(500).json({
      msg: 'Internal Server Error'
    })
  }
}

module.exports = errorHandler