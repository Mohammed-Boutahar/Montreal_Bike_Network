const express = require("express");
const router = express.Router();
const pointInteretController = require("../controllers/pointInteretController");

router.get("/", pointInteretController.getPointsInterets);
router.get("/tous", pointInteretController.getAllPointsInterets);
router.get("/map", pointInteretController.getMapData);
router.get("/arrondissement", pointInteretController.getArrondissement);
router.get("/:id", pointInteretController.getPointsInteretsById);

router.post("/", pointInteretController.addPointInteret);

router.patch("/:id", pointInteretController.modifyPointInteret);

router.put("/:id", pointInteretController.replacePointInteret);

router.delete("/:id", pointInteretController.deletePointInteret);

module.exports = router;