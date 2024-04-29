const mongoose = require("mongoose")

const atelierssSchema = mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  coach: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: false }
})

module.exports = mongoose.model("Ateliers", atelierssSchema)
