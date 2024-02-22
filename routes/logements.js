const express = require('express');
const router = express.Router();
const Logements = require("../models/Logements.js")

// Express utilisera cette fonction pour tout type de requête
// On renvoi une réponse en JSON
router.get("/api/logements", (req, res, next) => {
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
  
  router.get("/api/logements/:id", (req, res, next) => {
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
  
  router.put("/api/logements/:id", (req, res, next) => {
    Logements.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Logement modifié !" }))
      .catch((error) => res.status(400).json({ error }))
  })
  
  router.delete("/api/logements/:id", (req, res, next) => {
    Logements.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Logement supprimé !" }))
      .catch((error) => res.status(400).json({ error }))
  })

  
// Fin du document
module.exports = router;