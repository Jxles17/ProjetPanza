const express = require("express");
const router = express.Router();
const userCtrl = require("./../controllers/user.js");
const auth = require("./../middlewares/auth.js");

// Les routes
router.post("/signup", userCtrl.signUpUser);

router.post("/login", userCtrl.loginUser);

router.get("/", auth, userCtrl.getAllUser);

router.post("/", auth, userCtrl.createUser);

router.get("/:id", auth, userCtrl.getUserById);

router.put("/:id", auth, userCtrl.updateUserById);

router.delete("/:id", auth, userCtrl.deleteUserById);

router.post('/participation', userCtrl.addUserToSpectacle);


// Fin du document
module.exports = router;
