const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

const Task = (module.exports = mongoose.model("Task", taskSchema))

module.exports.getTasks = (callback, limit) => {
  Task.find(callback).limit(limit)
}

module.exports.getTask = (id, callback) => {
  Task.findById(id, callback)
}

module.exports.createTask = (task, callback) => {
  Task.create(task, callback)
}

module.exports.modifyTask = (id, task, callback) => {
  Task.findByIdAndUpdate(id, { ...task }, {}, callback)
}

module.exports.deleteTask = (id, callback) => {
  Task.findByIdAndDelete(id, callback)
}
