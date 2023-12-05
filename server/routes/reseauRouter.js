const express = require("express");
const router = express.Router();
const reseauController = require("../controllers/reseauController");

module.exports = function (collection) {
    router.use((req, res, next) => {
      req.db = collection; // Use the collection directly
      next();
    });
  
    // Routes pour le modèle de données réseau cyclable
    router.get("/", reseauController.getReseau); // Cette route renvoie le GeoJSON complet
    router.get("/:id", reseauController.getReseauById); // Cette route renvoie le GeoJSON d'une seule piste
    return router;
};
