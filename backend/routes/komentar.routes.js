module.exports = (app) => {
  const komentari = require("../controllers/komentar.controller.js");
  const express = require("express");
  const router = express.Router();

  // Middleware za provjeru prijave
  const authMiddleware = (req, res, next) => {
    console.log("Sesija u middlewareu:", req.session);
    if (!req.session || !req.session.korisnikId) {
      return res.status(401).send({ message: "Morate biti prijavljeni za ovu akciju." });
    }
    next();
  };

  

  // Ruta za kreiranje komentara (s middlewareom)
  router.post("/", authMiddleware, komentari.createKomentar);

  // Ruta za dohvat komentara za određenu vijest
  router.get("/:ID_vijesti", komentari.getKomentariByVijest);

  // Nova ruta za dohvat komentara specifičnih za korisnika
  router.get("/mycomments/:ID_korisnika", komentari.getKomentariByUser);

  app.use("/api/komentar", router);
};