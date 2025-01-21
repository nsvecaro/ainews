module.exports = (app) => {
  const korisnici = require("../controllers/korisnik.controller.js");
  const express = require("express");
  const router = express.Router();

  // Ruta za kreiranje korisnika
  router.post("/", korisnici.createKorisnik);

  // Ruta za provjeru sesije
  router.get("/session", korisnici.checkSession);

  // Ruta za dohvat svih korisnika
  router.get("/", korisnici.getKorisnik);

  // Ruta za dohvat korisnika po ID-u
  router.get("/:id", korisnici.getKorisnikById);

  // Ruta za prijavu korisnika
  router.post("/login", korisnici.loginKorisnik);

  // Ruta za promjenu korisničkog imena
  router.put("/username", korisnici.updateUsername);

  // Ruta za odjavu korisnika
  router.post("/logout", korisnici.logoutKorisnik);

  // Ruta za promjenu korisničkog imena
  router.put("/:id/username", korisnici.updateUsername);

  // Ruta za promjenu lozinke
  router.put("/:id/password", korisnici.updatePassword);

  app.use("/api/korisnik", router);
};
