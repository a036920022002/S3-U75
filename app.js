const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')

//connect mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

//index show the todo
app.get('/', (req, res) => {
  Todo.find()
    .lean().then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/news', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  // const todo = new Todo({ name: name })
  // return todo.save().then(() => res.redirect('/'))
  //   .catch(error => console.log('error'))
  return Todo.create({ name: name }).then(() => res.redirect('/'))
    .catch(error => console.log('error'))
})

app.get('/todos/:id', (req, res) => {

  const id = req.params.id
  return Todo.findById(id).lean().then(todo => res.render('detail', { todo }))
    .catch(error => console.log('error'))
})

app.get('/todos/:id/edit', (req, res) => {

  const id = req.params.id
  return Todo.findById(id).lean().then(todo => res.render('edit', { todo }))
    .catch(error => console.log('error'))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id).then(todo => {
    todo.name = name
    return todo.save()
  })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => { console.log(error) })

})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).then(todo => {
    todo.remove()
  })
    .then(() => res.redirect('/'))
    .catch(error => { console.log(error) })
})


app.listen(3000, () => {
  console.log('http://localhost:3000')
})