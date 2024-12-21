const Korisnik = require("../models/korisnik.model.js");

// Kreiranje korisnika
exports.createKorisnik = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Podaci ne mogu biti prazni!" });
  }
//console log za provjeru maknut jer radi

  const korisnik = {
    username: req.body.username,
    lozinka: req.body.lozinka,
    email: req.body.email,
    uloga: req.body.uloga || "Guest",
  };

  Korisnik.createKorisnik(korisnik, (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).send({ message: "Korisničko ime ili email već postoje!" });
      }
      return res.status(500).send({ message: err.message || "Greška prilikom kreiranja korisnika." });
    }
    res.send(data);
  });
};

// Dohvat svih korisnika
exports.getKorisnik = (req, res) => {
  Korisnik.getKorisnik((err, data) => {
    if (err) {
      return res.status(500).send({ message: err.message || "Greška prilikom dohvaćanja korisnika." });
    }
    res.send(data);
  });
};

// Dohvat korisnika po ID-u
exports.getKorisnikById = (req, res) => {
  Korisnik.getKorisnikById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: `Korisnik s ID-om ${req.params.id} nije pronađen.` });
      }
      return res.status(500).send({ message: `Greška prilikom dohvaćanja korisnika s ID-om ${req.params.id}.` });
    }
    res.send(data);
  });
};

// Prijava korisnika
exports.loginKorisnik = (req, res) => {
  const { username, lozinka } = req.body;

  if (!username || !lozinka) {
    return res.status(400).send({ message: "Username i lozinka su obavezni!" });
  }

  Korisnik.loginKorisnik(username, lozinka, (err, korisnik) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: "Korisnik nije pronađen." });
      } else if (err.kind === "invalid_password") {
        return res.status(401).send({ message: "Neispravna lozinka." });
      } else {
        return res.status(500).send({ message: "Greška prilikom prijave." });
      }
    }

    // Pohrani korisničke podatke u sesiju
    req.session.korisnikId = korisnik.ID_korisnika; // Koristi ispravno ime atributa
    req.session.korisnikIme = korisnik.username;

    res.send({
      message: "Prijava uspješna",
      korisnikIme: korisnik.username,
    });
  });
};
