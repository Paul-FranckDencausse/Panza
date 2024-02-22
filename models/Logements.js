const mongoose = require("mongoose")

const logementsSchema = mongoose.Schema({
  title: { type: String, required: true },
  cover: { type: String, required: true, default: "https://picsum.photos/1600" },
  pictures: { type: [String], required: true, default: ["https://picsum.photos/1600"] },
  description: { type: String, required: true },
  nameHost: { type: String, required: true },
  pictureHost: { type: String, required: true, default: "https://picsum.photos/200/200" },
  rating: { type: Number, required: true },
  location: { type: String, required: true },
  equipments: { type: String, required: true },
  tags: { type: String, required: true },
})

module.exports = mongoose.model("Logements", logementsSchema)
