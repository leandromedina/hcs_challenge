const seeder = require("mongoose-seed")

seeder.connect(`mongodb://localhost/${process.env.DB_NAME}`, function() {
  seeder.loadModels(["models/user.js", "models/task.js"])

  seeder.clearModels(["User", "Task"], function() {
    seeder.populateModels(seeds, function() {
      seeder.disconnect()
    })
  })
})

const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
  .toISOString()
  .substring(0, 10)

const seeds = [
  {
    model: "User",
    documents: [
      {
        name: "Leandro Medina",
        username: "codemonkey",
        password: "password"
      },
      {
        name: "Test User",
        username: "test",
        password: "test"
      }
    ]
  },
  {
    model: "Task",
    documents: [
      {
        title: "My First Task",
        due_date: tomorrow,
        completed: false
      }
    ]
  }
]
