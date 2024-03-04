const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  privileges: { type: String, required: true } // Vous pouvez adapter les privilèges selon vos besoins
});

// Avant de sauvegarder l'administrateur dans la base de données, hashons son mot de passe
adminSchema.pre('save', async function(next) {
  const admin = this;
  if (!admin.isModified('password')) {
    return next();
  }
  const hashedPassword = await bcrypt.hash(admin.password, 10);
  admin.password = hashedPassword;
  next();
});

// Méthode pour vérifier le mot de passe
adminSchema.methods.isValidPassword = async function(password) {
  const admin = this;
  const compare = await bcrypt.compare(password, admin.password);
  return compare;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
