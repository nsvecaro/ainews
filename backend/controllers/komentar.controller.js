const Komentar = require("../models/komentar.model.js");

// kreiranje komentara
exports.createKomentar = (req, res) => {
  if (!req.session || !req.session.korisnikId) {
    return res.status(401).send({ message: "Korisnik nije prijavljen." });
  }

  if (!req.body.sadrzaj || !req.body.ID_vijesti) {
    return res.status(400).send({ message: "Svi podaci su obavezni!" });
  }

  const komentar = new Komentar({
    sadrzaj: req.body.sadrzaj,
    ID_korisnika: req.session.korisnikId,
    ID_vijesti: req.body.ID_vijesti,
  });

  Komentar.createKomentar(komentar, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Greška prilikom kreiranja komentara.",
      });
    }
    res.send({ ...data, username: req.session.korisnikIme }); // Dodaj korisničko ime iz sesije
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

// nova metoda za dohvat komentara korisnika
// nova metoda za dohvat komentara korisnika
exports.getKomentariByUser = (req, res) => {
  const ID_korisnika = req.session.korisnikId; // Dohvati ID iz sesije, ne iz URL-a
  if (!ID_korisnika) {
    return res.status(401).send({ message: "Morate biti prijavljeni za ovu akciju." });
  }
  Komentar.getKomentariByUser(ID_korisnika, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Greška prilikom dohvaćanja komentara.",
      });
    }
    res.send(data);
  });
};

