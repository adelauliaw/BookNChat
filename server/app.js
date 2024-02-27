if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
// console.log(process.env)
const express = require('express')
const app = express()
const router = require('./routes');
// const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')


app.use(cors())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())
app.use(router)
// app.use(errorHandler)

module.exports = app