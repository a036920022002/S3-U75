const mongoose = require('mongoose')
const Todo = require('../todo')
require('dotenv').config()
const MY_ENV = process.env.MY_ENV

mongoose.connect(MY_ENV, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

for (let i = 0; i < 10; i++) {
  Todo.create({ name: `name-${i}` })
}
console.log('done.')
