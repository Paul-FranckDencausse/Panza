const express = require("express");
const router = express.Router();
const logementsCtrl = require("./../controllers/logements.js");
const auth = require("./../middlewares/auth.js");

// Les routes
router.get("/", logementsCtrl.getAllHousing);

router.post("/", auth, logementsCtrl.createHousing);

router.get("/:id", logementsCtrl.getHousingById);

router.put("/:id", auth, logementsCtrl.updateHousingById);

router.delete("/:id", auth, logementsCtrl.deleteHousingById);

// Fin du document
module.exports = router;
