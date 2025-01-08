const Komentar = require("../models/komentar.model.js");

// kreiranje komentara
exports.createKomentar = (req, res) => {
  if (!req.body.sadrzaj || !req.body.ID_vijesti || !req.body.ID_korisnika) {
    return res.status(400).send({ message: "Svi podaci su obavezni!" });
  }

  const komentar = new Komentar({
    sadrzaj: req.body.sadrzaj,
    ID_korisnika: req.body.ID_korisnika,
    ID_vijesti: req.body.ID_vijesti,
  });

  Komentar.createKomentar(komentar, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Greška prilikom kreiranja komentara.",
      });
    }
    res.send(data);
  });
};

// dohvati komentara za vijest
exports.getKomentariByVijest = (req, res) => {
  Komentar.getKomentariByVijest(req.params.ID_vijesti, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Greška prilikom dohvaćanja komentara.",
      });
    }
    res.send(data);
  });
};
