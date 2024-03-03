const errorHandler = (error, req, res, next) => {
  console.log(error, "<<<<<<<<<<<");
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    res.status(400).json({
      msg: error.errors[0].message,
    })
  }else if (error.name === "invalidPhoneNumber") {
    res.status(400).json({ 
      msg: 'Password must contain at least one of the specified special characters  and have a minimum of 1 capital letter' 
    });
  }else if(error.name === "invalidPassword"){
    res.status(400).json({
      msg: 'Password must contain at least one of the specified special characters and have a minimum of 1 capital letter'
    })
  }
  else if(error.name === "invalidToken"){
    res.status(401).json({
      msg: 'Invalid Token'
    })
  }
  else {
    console.log(error)
    res.status(500).json({
      msg: 'Internal Server Error'
    })
  }
}

module.exports = errorHandler