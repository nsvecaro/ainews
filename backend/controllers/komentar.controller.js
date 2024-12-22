const Komentar = require("../models/komentar.model.js");

// Kreiranje komentara
exports.createKomentar = (req, res) => {
  if (!req.body.sadrzaj || !req.body.ID_korisnika || !req.body.ID_vijesti) {
    res.status(400).send({ message: "Sadržaj, ID korisnika i ID vijesti ne mogu biti prazni!" });
    return;
  }

  const noviKomentar = new Komentar({
    sadrzaj: req.body.sadrzaj,
    datum_objave: new Date(),
    ID_korisnika: req.body.ID_korisnika,
    ID_vijesti: req.body.ID_vijesti,
  });

  Komentar.create(noviKomentar, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Greška prilikom stvaranja komentara." });
    } else {
      res.send(data);
    }
  });
};

// Dohvat svih komentara
exports.getAllKomentari = (req, res) => {
  Komentar.getAll((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Greška prilikom dohvaćanja komentara." });
    } else {
      res.send(data);
    }
  });
};

// Dohvat komentara za određenu vijest
exports.getKomentariByVijest = (req, res) => {
  const ID_vijesti = req.params.ID_vijesti;

  Komentar.findByVijestId(ID_vijesti, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || `Greška prilikom dohvaćanja komentara za vijest ${ID_vijesti}.` });
    } else {
      res.send(data);
    }
  });
};

// Brisanje komentara
exports.deleteKomentar = (req, res) => {
  const ID_komentara = req.params.ID_komentara;

  Komentar.remove(ID_komentara, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Komentar s ID-om ${ID_komentara} nije pronađen.` });
      } else {
        res.status(500).send({ message: `Greška prilikom brisanja komentara s ID-om ${ID_komentara}.` });
      }
    } else {
      res.send({ message: "Komentar uspješno obrisan!" });
    }
  });
};
