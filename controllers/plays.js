// Importation du modèle de pièces de théâtre
const Plays = require('../models/playsModel');

// Méthode pour récupérer toutes les pièces de théâtre
exports.getAllPlays = async (req, res) => {
    try {
        const plays = await Plays.find();
        res.status(200).json({ success: true, data: plays });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Méthode pour créer une nouvelle pièce de théâtre
exports.createPlay = async (req, res) => {
    try {
        const newPlay = await Plays.create(req.body);
        res.status(201).json({ success: true, data: newPlay });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Méthode pour récupérer une pièce de théâtre par son ID
exports.getPlayById = async (req, res) => {
    try {
        const play = await Plays.findById(req.params.id);
        if (!play) {
            return res.status(404).json({ success: false, message: 'Pièce de théâtre non trouvée' });
        }
        res.status(200).json({ success: true, data: play });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Méthode pour mettre à jour une pièce de théâtre
exports.updatePlayById = async (req, res) => {
    try {
        const updatedPlay = await Plays.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPlay) {
            return res.status(404).json({ success: false, message: 'Pièce de théâtre non trouvée' });
        }
        res.status(200).json({ success: true, data: updatedPlay });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Méthode pour supprimer une pièce de théâtre
exports.deletePlayById = async (req, res) => {
    try {
        const play = await Plays.findByIdAndDelete(req.params.id);
        if (!play) {
            return res.status(404).json({ success: false, message: 'Pièce de théâtre non trouvée' });
        }
        res.status(200).json({ success: true, message: 'Pièce de théâtre supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Supposons que vous ayez une liste statique de pièces de théâtre
const plays = [
  { id: 1, title: 'Romeo and Juliet', description: 'A comic love story', genre: 'Tragedy' },
  { id: 2, title: 'Hamlet', description: 'A revenge tragedy', genre: 'Tragedy' },
  { id: 3, title: 'Macbeth', description: 'A story of ambition and treachery', genre: 'Tragedy' },
  { id: 4, title: 'A Midsummer Night\'s Dream', description: 'A romantic comedy', genre: 'Comedy' },
  { id: 5, title: 'The Tempest', description: 'A tale of magic and forgiveness', genre: 'Comedy' }
];

// Fonction pour récupérer toutes les pièces de théâtre
const getAllPlays = async () => {
  return plays; // Simplement retourner la liste statique de pièces de théâtre
};

module.exports = {
  getAllPlays
};
