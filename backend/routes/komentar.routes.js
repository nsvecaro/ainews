module.exports = (app) => {
  const komentari = require("../controllers/komentar.controller.js");
  const express = require("express");
  const router = express.Router();

  // ruta za kreiranje komentara
  router.post("/", komentari.createKomentar);

  // ruta za dohvat komentara za određenu vijest
  router.get("/:ID_vijesti", komentari.getKomentariByVijest);

  // nova ruta za dohvat komentara specifičnih za korisnika
  router.get("/mycomments/:ID_korisnika", komentari.getKomentariByUser);

  app.use("/api/komentar", router);
};
