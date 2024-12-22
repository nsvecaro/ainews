const Komentar = require("../models/komentar.model.js");

// Stvaranje novog komentara
exports.createKomentar = (req, res) => {
  if (!req.body || !req.body.sadrzaj || !req.body.ID_vijesti || !req.body.ID_korisnika) {
    return res.status(400).send({ message: "Sadržaj, ID korisnika i ID vijesti su obavezni!" });
  }

  const noviKomentar = new Komentar({
    sadrzaj: req.body.sadrzaj,
    ID_vijesti: req.body.ID_vijesti,
    ID_korisnika: req.body.ID_korisnika,
    datum_objave: new Date()
  });

  Komentar.create(noviKomentar, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Greška prilikom kreiranja komentara." });
    }
    res.send(data);
  });
};

// Dohvat svih komentara
exports.getAllKomentari = (req, res) => {
  Komentar.getAll((err, data) => {
    if (err) {
      return res.status(500).send({ message: "Greška prilikom dohvaćanja komentara." });
    }
    res.send(data);
  });
};

// Dohvat komentara po ID-u vijesti
exports.getKomentariByVijest = (req, res) => {
  Komentar.findByVijestId(req.params.ID_vijesti, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: "Komentari za zadanu vijest nisu pronađeni." });
      }
      return res.status(500).send({ message: "Greška prilikom dohvaćanja komentara za vijest." });
    }
    res.send(data);
  });
};

// Brisanje komentara
exports.deleteKomentar = (req, res) => {
  Komentar.remove(req.params.ID_komentara, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: "Komentar nije pronađen." });
      }
      return res.status(500).send({ message: "Greška prilikom brisanja komentara." });
    }
    res.send({ message: "Komentar uspješno obrisan." });
  });
};
