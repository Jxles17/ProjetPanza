const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./../middlewares/auth.js");
const Spectacle = require('../models/Spectacles.js');

exports.signUpUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        name: req.body.name,
        birthdate: req.body.birthdate,atelier,
        role: req.body.role
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.loginUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUser = (req, res, next) => {
  // Vérifier si l'utilisateur est administrateur
  if (req.auth.role == 'member') {
    return res.status(403).json({ message: 'Accès interdit' });
  }
  // Si l'utilisateur est administrateur, récupérer la liste des utilisateurs
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
  // console.log(req.auth.role);
};

exports.createUser = (req, res, next) => {
  const atelier = new User({
    ...req.body, // On décompose toutes les données dans le req.body
  });
  atelier
    .save() // On enregistre dans la BDD
    .then(() => res.status(201).json({ message: "Le user vient d'être créé !" }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((atelier) => {
      console.log(atelier);
      res.status(200).json({
        id: atelier._id,
        title: atelier.title,
        duration: atelier.duration,
        description: atelier.description,
        coach: atelier.coach,
        location: atelier.location
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.updateUserById = (req, res, next) => {
  User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "user modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUserById = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "user supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.addUserToSpectacle = async (req, res, next) => {
  try {

    // Vérifier si l'utilisateur existe
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le spectacle existe
    const spectacle = await Spectacle.findById(req.body.spectacleId);
    if (!spectacle) {
      return res.status(404).json({ message: 'Spectacle non trouvé' });
    }

    // Ajouter le spectacle à la liste des spectacles de l'utilisateur
    user.spectacles.push(req.body.spectacleId);
    await user.save();

    res.status(200).json({ message: 'Utilisateur ajouté au spectacle avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

