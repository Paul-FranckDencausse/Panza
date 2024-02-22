// on importe le paquet express
const express = require("express")

// On crée l'application Express
const app = express()
const mongoose = require("mongoose")
const Logements = require("./models/Logements.js")

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*") // Permet de dire que tout le monde peut y accéder
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization") // L'autorisation ici de certains en-tête
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
  next() // L'autorisation des différentes méthodes HHTP
})

mongoose
  .connect("mongodb+srv://adminTest:kuFFbQ3TZb9sfsNl@cluster0.2vatb0h.mongodb.net/casaNum2?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"))

// Express utilisera cette fonction pour tout type de requête
// On renvoi une réponse en JSON
app.get("/api/logements", (req, res, next) => {
  Logements.find()
    .then((logements) => res.status(200).json(logements))
    .catch((error) => res.status(400).json({ error }))
})

app.post("/api/logements", (req, res, next) => {
  const logement = new Logements({
    ...req.body, // On décompose toutes les données dans le req.body
  })
  logement
    .save() // On enregistre dans la BDD
    .then(() => res.status(201).json({ message: "Le logement vient d'être créé !" }))
    .catch((error) => res.status(400).json({ error: error }))
})

app.get("/api/logements/:id", (req, res, next) => {
  Logements.findOne({ _id: req.params.id })
    .then((logements) => {
      console.log(logements)
      res.status(200).json({
        id: logement._id,
        title: logements.title,
        cover: "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-2-1.jpg",
        pictures: [
          "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-2-1.jpg",
          "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-2-2.jpg",
          "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-2-3.jpg",
          "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-2-4.jpg",
        ],
        description: logements.description,
        host: {
          name: "Franck Maher",
          picture: "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-2.jpg",
        },
        rating: "3",
        location: "Ile de France - Paris 20e",
        equipments: ["Wi-fi", "Cuisine équipée", "Télévision", "Sèche Cheveux"],
        tags: ["Buttes Chaumont", "Laumière", "Studio"],
      })
    })
    .catch((error) => res.status(404).json({ error }))
})

// On export l’application
module.exports = app
