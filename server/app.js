const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

const User = require("./models/user")
const Task = require("./models/task")

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

app.get("/", (req, res, next) => {
  res.send(
    "Welcome to the Task Manager API. Please use /api/tasks or /api/users"
  )
})

app.post("/api/login", (req, res, next) => {
  const user = req.body
  User.loginUser(user.username, user.password, (err, user) => {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

app.get("/api/users", (req, res, next) => {
  User.getUsers((err, users) => {
    if (err) {
      throw err
    }
    res.json(users)
  })
})

app.get("/api/users/:id", (req, res, next) => {
  const id = req.params.id
  User.getUser(id, (err, users) => {
    if (err) {
      throw err
    }
    res.json(users)
  })
})

app.post("/api/users", (req, res, next) => {
  const user = req.body
  User.createUser(user, (err, user) => {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

app.put("/api/users/:id", (req, res, next) => {
  const id = req.params.id
  const user = req.body
  User.modifyUser(id, user, (err, user) => {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

app.delete("/api/users/:id", (req, res, next) => {
  const id = req.params.id
  User.deleteUser(id, (err, user) => {
    if (err) {
      throw err
    }
    res.json(user)
  })
})

app.get("/api/tasks", (req, res, next) => {
  Task.getTasks((err, tasks) => {
    if (err) {
      throw err
    }
    res.json(tasks)
  })
})

app.get("/api/tasks/:id", (req, res, next) => {
  const id = req.params.id
  Task.getTask(id, (err, tasks) => {
    if (err) {
      throw err
    }
    res.json(tasks)
  })
})

app.post("/api/tasks", (req, res, next) => {
  const task = req.body
  Task.createTask(task, (err, task) => {
    if (err) {
      throw err
    }
    res.json(task)
  })
})

app.put("/api/tasks/:id", (req, res, next) => {
  const id = req.params.id
  const task = req.body
  Task.modifyTask(id, task, (err, task) => {
    if (err) {
      throw err
    }
    res.json(task)
  })
})

app.delete("/api/tasks/:id", (req, res, next) => {
  const id = req.params.id
  Task.deleteTask(id, (err, task) => {
    if (err) {
      throw err
    }
    res.json(task)
  })
})

app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(3000)
console.log("Running on port 3000...")
