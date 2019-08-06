const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`)
const db = mongoose.connection

app.listen(3000)
console.log("Running on port 3000...")
