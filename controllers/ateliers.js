const Ateliers = require("../models/Ateliers.js");

exports.getAllAteliers = (req, res, next) => {
  Ateliers.find()
    .then((ateliers) => res.status(200).json(ateliers))
    .catch((error) => res.status(400).json({ error }));
};

exports.createAteliers = (req, res, next) => {
  const atelier = new Ateliers({
    ...req.body, // On décompose toutes les données dans le req.body
  });
  atelier
    .save() // On enregistre dans la BDD
    .then(() => res.status(201).json({ message: "L'atelier vient d'être créé !" }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getAteliersById = (req, res, next) => {
  Ateliers.findOne({ _id: req.params.id })
    .then((atelier) => {
      console.log(atelier);
      res.status(200).json({
        id: atelier._id,
        title: atelier.title,
        duration: atelier.duration,
        description: atelier.description,
        coach: atelier.coach,
        location: atelier,
        date: atelier.date
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.updateAteliersById = (req, res, next) => {
  Ateliers.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Atelier modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteAteliersById = (req, res, next) => {
  Ateliers.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Atelier supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
