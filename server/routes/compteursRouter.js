const express = require("express");
const router = express.Router();
const compteursController = require("../controllers/compteursController");

module.exports = function (collection) {
  router.use((req, res, next) => {
    req.db = collection; 
    next(); // Pass the request to the next middleware (server.js)
  });

  router.get("/", compteursController.getCompteurs);
  router.get("/all", compteursController.getCompteursAll);
  router.get("/:id", compteursController.getCompteurById);

  return router;
};
