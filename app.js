// on importe le paquet express
const express = require("express");

// On crée l'application Express
const app = express();
const mongoose = require("mongoose");

// On importe toutes nos routes
const ateliersRoutes = require("./routes/ateliers.js");
const spectaclesRoutes = require("./routes/spectacles.js");
const userRoutes = require("./routes/user.js");
const eventsRoutes = require("./routes/events.js");

// import helmet 
var helmet = require('helmet');
app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permet de dire que tout le monde peut y accéder
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"); // L'autorisation ici de certains en-tête
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next(); // L'autorisation des différentes méthodes HHTP
});


mongoose
  .connect("mongodb+srv://julesherve17:Jesuisrayz1@cluster0.essflmr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// A la place des anciens app.use()
app.use("/api/ateliers", ateliersRoutes);
app.use("/api/spectacles", spectaclesRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/user", userRoutes);


// On export l’application
module.exports = app;
