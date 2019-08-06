const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

const User = (module.exports = mongoose.model("User", userSchema))

module.exports.loginUser = (username, password, callback) => {
  const conditions = { username, password }
  User.findOne(conditions, callback)
}

module.exports.getUsers = (callback, limit) => {
  User.find(callback).limit(limit)
}

module.exports.getUser = (id, callback) => {
  User.findById(id, callback)
}

module.exports.createUser = (user, callback) => {
  User.create(user, callback)
}

module.exports.modifyUser = (id, user, options, callback) => {
  const update = {
    name: user.name
  }
  User.findByIdAndUpdate(id, update, options, callback)
}

module.exports.deleteUser = (id, callback) => {
  User.findByIdAndDelete(id, callback)
}
