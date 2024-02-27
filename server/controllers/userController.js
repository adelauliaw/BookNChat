module.exports = class UserController {
  static async createUser(req, res, next) {
    try {
      const newUser = await User.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Password,
        PhoneNumber: req.body.PhoneNumber,
        ImageURL: req.body.ImageURL
      })
      res.status(201).json(`User with email ${newUser.Email} and id ${newUser.id} has been created`)
    } catch (error) {
      console.log(error, "<<<user");
      next(error)
    }
  }



}
