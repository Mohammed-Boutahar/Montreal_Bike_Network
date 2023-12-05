const express = require("express");
const router = express.Router();
const reseauController = require("../controllers/territoiresController");

router.get("/", reseauController.getTerritoires);

module.exports = router;
