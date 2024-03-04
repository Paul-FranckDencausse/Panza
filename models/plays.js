const mongoose = require("mongoose");

const playSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  // Autres champs spécifiques aux pièces de théâtre
});

module.exports = mongoose.model("Play", playSchema);
