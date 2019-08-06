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
