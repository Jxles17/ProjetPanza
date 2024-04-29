const express = require("express");
const router = express.Router();
const spectaclesCtrl = require("./../controllers/spectacles.js");
const auth = require("./../middlewares/auth.js");

// Les routes
router.get("/", spectaclesCtrl.getAllSpectacles);

router.post("/", auth, spectaclesCtrl.createSpectacles);

router.get("/:id", spectaclesCtrl.getSpectaclesById);

router.put("/:id", auth, spectaclesCtrl.updateSpectaclesById);

router.delete("/:id", auth, spectaclesCtrl.deleteSpectaclesById);

router.get('/:spectacleId/participants', spectaclesCtrl.getUsersBySpectacle);

// Fin du document
module.exports = router;
