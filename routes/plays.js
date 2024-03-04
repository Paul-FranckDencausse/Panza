const express = require('express');
const router = express.Router();
const Play = require('../models/model'); // Assurez-vous que le chemin est correct ici

// GET all plays
router.get('/', async (req, res) => {
  try {
    const plays = await Play.find();
    res.json(plays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Autres routes pour POST, PUT, DELETE, etc...

module.exports = router;
