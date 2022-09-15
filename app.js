const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')


const router = require('./routes/index')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000
//use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//use bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(router)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})