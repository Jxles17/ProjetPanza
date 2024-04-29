const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  // Champ "category" pour indiquer le type d'événement (atelier ou spectacle)
  category: { type: String, enum: ['atelier', 'spectacle'], required: true }
});

module.exports = mongoose.model("Event", eventSchema);