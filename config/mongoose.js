const mongoose = require('mongoose')
require('dotenv').config()

const MY_ENV = process.env.MY_ENV

//connect mongoose
mongoose.connect(MY_ENV, { useNewUrlParser: true, useUnifiedTopology: true })
//check mongoose connection 
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db 