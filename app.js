const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const Todo = require('./models/todo')
require('dotenv').config()
const MY_ENV = process.env.MY_ENV
const router = require('./routes')

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
//use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//use bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//index show the todo

app.use(router)
// app.get('/', (req, res) => {
//   Todo.find()
//     .lean()
//     .sort({ _id: 'asc' })
//     .then(todos => res.render('index', { todos }))
//     .catch(error => console.error(error))
// })




app.listen(3000, () => {
  console.log('http://localhost:3000')
})