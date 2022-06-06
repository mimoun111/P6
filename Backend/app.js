// Importation des plugins
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const helmet = require("helmet");
// Importation des routes
const sauceRoutes = require("../Backend/routes/sauces");
const userRoutes = require("../Backend/routes/user");

// Connexion à la base de données
mongoose
  .connect(
    "mongodb+srv://MimounMohamed:Ov4RPkq82i7Ajrd8@cluster0.d3o1s.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Lancement de Express
const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Configuration cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Parse le body les requetes en json
app.use(express.json());
// Log toutes les requêtes passées au serveur (sécurité)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
// Affiche chaque requête effectué dans le fichier "asses.log"
app.use(morgan("combined", { stream: accessLogStream }));

// Les Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
