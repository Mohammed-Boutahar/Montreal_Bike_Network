const express = require("express");
const router = express.Router();
const comptagePassagesRouter = require("../controllers/comptagePassagesController");

module.exports = function (collection) {
  router.use((req, res, next) => {
    req.db = collection; 
    next(); // Pass the request to the next middleware (server.js)
  });

  router.get("/passages", comptagePassagesRouter.getPassagesAll);
  router.get("/:id/passages", comptagePassagesRouter.getPassagesForId);

  return router;
};
