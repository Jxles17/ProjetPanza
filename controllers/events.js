const Event = require("../models/events.js");

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAteliers = async (req, res, next) => {
    try {
      const ateliers = await Event.find({ category: 'atelier' });
      res.status(200).json(ateliers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.getAllSpectacles = async (req, res, next) => {
    try {
      const spectacles = await Event.find({ category: 'spectacle' });
      res.status(200).json(spectacles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };