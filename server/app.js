const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

app.use(bodyParser.json())

const User = require("./models/user")
const Task = require("./models/task")

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})
// const db = mongoose.connection

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Task Manager API. Please use /api/tasks or /api/users"
  )
})

app.post("/api/login", (req, res) => {
  const user = req.body
  User.loginUser(user.username, user.password, (err, user) => {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

app.get("/api/users", (req, res) => {
  User.getUsers((err, users) => {
    if (err) {
      throw err
    }
    res.json(users)
  })
})

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id
  User.getUser(id, (err, users) => {
    if (err) {
      throw err
    }
    res.json(users)
  })
})

app.post("/api/users", (req, res) => {
  const user = req.body
  User.createUser(user, (err, user) => {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

app.put("/api/users/:id", (req, res) => {
  const id = req.params.id
  const user = req.body
  User.modifyUser(id, user, {}, (err, user) => {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id
  User.deleteUser(id, (err, user) => {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

app.get("/api/tasks", (req, res) => {
  Task.getTasks((err, tasks) => {
    if (err) {
      throw err
    }
    res.json(tasks)
  })
})

app.get("/api/tasks/:id", (req, res) => {
  const id = req.params.id
  Task.getTask(id, (err, tasks) => {
    if (err) {
      throw err
    }
    res.json(tasks)
  })
})

app.post("/api/tasks", (req, res) => {
  const task = req.body
  Task.createTask(task, (err, task) => {
    if (err) {
      throw err
    }
    res.json(task)
  })
})

app.put("/api/tasks/:id", (req, res) => {
  const id = req.params.id
  const task = req.body
  Task.modifyTask(id, task, {}, (err, task) => {
    if (err) {
      throw err
    }
    res.json(task)
  })
})

app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id
  Task.deleteTask(id, (err, task) => {
    if (err) {
      throw err
    }
    res.json(task)
  })
})

app.listen(3000)
console.log("Running on port 3000...")
