const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

// Middleware pour générer le token JWT
function generateToken(admin) {
  return jwt.sign({ id: admin.id, email: admin.email }, 'your_secret_key', { expiresIn: '1h' });
}

// Contrôleur pour la création d'un nouvel administrateur
exports.createAdmin = async (req, res) => {
  try {
    const { email, password, privileges } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    const admin = await Admin.create({ email, password, privileges });
    const token = generateToken(admin);
    res.status(201).json({ message: 'Administrateur créé avec succès', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'administrateur' });
  }
};

// Contrôleur pour l'authentification de l'administrateur
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Administrateur non trouvé' });
    }
    const isValidPassword = await admin.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    const token = generateToken(admin);
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la tentative de connexion' });
  }
};
