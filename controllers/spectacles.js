const Spectacles = require("../models/Spectacles.js");
const User = require("../models/User.js");

exports.getAllSpectacles = (req, res, next) => {
  Spectacles.find()
    .then((spectacles) => res.status(200).json(spectacles))
    .catch((error) => res.status(400).json({ error }));
};

exports.createSpectacles = (req, res, next) => {
  const spectacles = new Spectacles({
    ...req.body, // On décompose toutes les données dans le req.body
  });
  spectacles
    .save() // On enregistre dans la BDD
    .then(() => res.status(201).json({ message: "Le spectacles vient d'être créé !" }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getSpectaclesById = (req, res, next) => {
  Spectacles.findOne({ _id: req.params.id })
    .then((spectacles) => {
      console.log(spectacles);
      res.status(200).json({
        id: spectacles._id,
        title: spectacles.title,
        duration: spectacles.duration,
        description: spectacles.description,
        coach: spectacles.coach,
        location: spectacles.location,
        date: spectacles.date,
        nbcomediens: spectacles.nbcomediens,
        categorie: spectacles.categorie
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.updateSpectaclesById = (req, res, next) => {
  Spectacles.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "le spectacle est modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSpectaclesById = (req, res, next) => {
  Spectacles.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "le spectacle est supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getUsersBySpectacle = async (req, res, next) => {
    try {
      console.log("Recherche des utilisateurs pour le spectacle :", req.params.spectacleId);
  
      // Rechercher les utilisateurs qui ont le spectacle dans leur liste de spectacles
      const users = await User.find({ spectacles: req.params.spectacleId });
  
      res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ error: error.message });
    }
  };