const express = require("express");
const router = express.Router();
const ateliersCtrl = require("./../controllers/ateliers.js");
const auth = require("./../middlewares/auth.js");

// Les routes
router.get("/", ateliersCtrl.getAllAteliers);

router.post("/", ateliersCtrl.createAteliers);

router.get("/:id", ateliersCtrl.getAteliersById);

router.put("/:id", ateliersCtrl.updateAteliersById);

router.delete("/:id", ateliersCtrl.deleteAteliersById);

// Fin du document
module.exports = router;
