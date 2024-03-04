// Importer les dépendances nécessaires
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); // Importer le modèle d'administrateur

// Route pour créer un nouvel administrateur
router.post('/admins', async (req, res) => {
    try {
        // Créer un nouvel administrateur en utilisant les données fournies dans la requête
        const newAdmin = await Admin.create(req.body);
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Exporter le routeur
module.exports = router;
