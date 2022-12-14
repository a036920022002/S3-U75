const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/news', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  // const todo = new Todo({ name: name })
  // return todo.save().then(() => res.redirect('/'))
  //   .catch(error => console.log('error'))
  return Todo.create({ name: name }).then(() => res.redirect('/'))
    .catch(error => console.log('error'))
})
//詳細資訊
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).lean().then(todo => res.render('detail', { todo }))
    .catch(error => console.log('error'))
})
//修改
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).lean().then(todo => res.render('edit', { todo }))
    .catch(error => console.log('error'))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id).then(todo => {
    todo.name = name
    todo.isDone = isDone === 'on'
    return todo.save()
  })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => { console.log(error) })

})
//刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).then(todo => {
    todo.remove()
  })
    .then(() => res.redirect('/'))
    .catch(error => { console.log(error) })
})



module.exports = router