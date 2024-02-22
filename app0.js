// on importe le paquet express
const express = require("express")

// On crée l'application Express
const app = express()
const Logements = require("./models/Logements.js")
app.use(express.json())

const mongoose = require("mongoose")

mongoose
  .connect("mongodb+srv://adminTest:kuFFbQ3TZb9sfsNl@cluster0.2vatb0h.mongodb.net/casa?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
  next()
})

app.post("/api/logements", (req, res, next) => {
  const logement = new Logements({
    ...req.body, // On décompose toutes les données dans le req.body
  })
  logement
    .save() // On enregistre dans la BDD
    .then(() =>
      res.status(201).json({
        message: "Le logement vient d'être créé !",
      })
    )
    .catch((error) => res.status(400).json({ message: error }))
})

app.post("/api/logementss", (req, res, next) => {
  console.log(req.body)
  res.status(201).json({
    message: "Le logement vient d'être créé !",
  })
})

app.get("/api/logements", (req, res, next) => {
  Logements.find()
    .then((logements) => res.status(200).json(logements))
    .catch((error) => res.status(400).json({ error }))
})

app.get("/api/logements/:id", (req, res, next) => {
  Logements.findOne({ _id: req.params.id })
    .then((logement) => {
      console.log(logement)
      res.status(200).json({
        id: logement._id,
        title: logement.title,
        cover: logement.cover,
        pictures: logement.pictures,
        description: logement.description,
        host: {
          name: logement.nameHost,
          picture: logement.pictureHost,
        },
        rating: logement.rating.toString(),
        location: logement.location,
        equipments: [logement.equipments],
        tags: logement.tags.split(","),
      })
    })
    .catch((error) => res.status(404).json({ error }))
})

app.put("/api/logements/:id", (req, res, next) => {
  Logements.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Logement modifié !" }))
    .catch((error) => res.status(400).json({ error }))
})

app.delete("/api/logements/:id", (req, res, next) => {
  Logements.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Logement supprimé !" }))
    .catch((error) => res.status(400).json({ error }))
})

// On export l’application
module.exports = app
