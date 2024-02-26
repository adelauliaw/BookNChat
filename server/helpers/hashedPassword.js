const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 8);
  return hash
}
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash); // true
}
module.exports = { hashPassword, comparePassword }
