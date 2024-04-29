const express = require("express");
const router = express.Router();
const eventsCtrl = require("../controllers/events.js");

// Les routes
router.get("/", eventsCtrl.getAllEvents);

// Route pour récupérer tous les ateliers
router.get('/ateliers', eventsCtrl.getAllAteliers);

// Route pour récupérer tous les spectacles
router.get('/spectacles', eventsCtrl.getAllSpectacles);

// Fin du document
module.exports = router;
