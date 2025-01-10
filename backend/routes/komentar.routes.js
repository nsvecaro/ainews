module.exports = (app) => {
  const komentari = require("../controllers/komentar.controller.js");
  const express = require("express");
  const router = express.Router();

 
  router.post("/", komentari.createKomentar);

  // ruta za dohvat komentara za određenu vijest
  router.get("/:ID_vijesti", komentari.getKomentariByVijest);

 

  app.use("/api/komentar", router);
};
