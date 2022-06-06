// Importation des plugins
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");
const dotenv = require("dotenv");
const result = dotenv.config();

// Importation des routes
const sauceRoutes = require("../Backend/routes/sauces");
const userRoutes = require("../Backend/routes/user");

// Connexion à la base de données
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.d3o1s.mongodb.net/?retryWrites=true&w=majority`,
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

// Les Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
