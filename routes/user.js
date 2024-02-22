const express = require("express");
const router = express.Router();
const userCtrl = require("./../controllers/user.js");

// Les routes
router.post("/signup", userCtrl.signUpUser);

router.post("/login", userCtrl.loginUser);

// Fin du document
module.exports = router;
