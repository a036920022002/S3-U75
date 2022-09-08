const express = require('express')

require('./config/mongoose')

const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')

const methodOverride = require('method-override')

const router = require('./routes')

const app = express()
//use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')
//use bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(router)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})