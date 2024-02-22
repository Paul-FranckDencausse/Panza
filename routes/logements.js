const express = require("express");
const router = express.Router();
const logementsCtrl = require("./../controllers/logements.js");

// Les routes
router.get("/", logementsCtrl.getAllHousing);

router.post("/", logementsCtrl.createHousing);

router.get("/:id", logementsCtrl.getHousingById);

router.put("/:id", logementsCtrl.updateHousingById);

router.delete("/:id", logementsCtrl.deleteHousingById);

// Fin du document
module.exports = router;
