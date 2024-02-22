// on importe le paquet express
const express = require("express")

// On crée l'application Express
const app = express()
const mongoose = require("mongoose")

// On importe toutes nos routes
const logementsRoutes = require('./routes/logements.js')

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

  // A la place des anciens app.use()
  app.use('/api/logements',logementsRoutes)


// On export l’application
module.exports = app
