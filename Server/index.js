const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017")

app.post('/add', (req, res) => {
    const task = req.body.task
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params
    TodoModel.findByIdAndUpdate({ _id: id })
        .then(result => TodoModel.findByIdAndUpdate(id,{done:!result.done}))
        .then(result => location.reload())
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running")
})