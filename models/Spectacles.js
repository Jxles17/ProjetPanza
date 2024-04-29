const mongoose = require("mongoose")

const spectaclessSchema = mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: false },
  nbcomediens: { type: Number, required: false },
  categorie: { type: String, required: false }

})

module.exports = mongoose.model("Spectacles", spectaclessSchema)
