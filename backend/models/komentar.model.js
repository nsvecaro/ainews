const db = require("../models/db.js");

const Komentar = function (komentar) {
  this.sadrzaj = komentar.sadrzaj;
  this.ID_korisnika = komentar.ID_korisnika;
  this.ID_vijesti = komentar.ID_vijesti;
  this.datum_objave = komentar.datum_objave || new Date();
};

// Kreiranje komentara
Komentar.createKomentar = (noviKomentar, result) => {
  db.query(
    `INSERT INTO RWA_komentar (sadrzaj, ID_korisnika, ID_vijesti) VALUES (?, ?, ?)`,
    [noviKomentar.sadrzaj, noviKomentar.ID_korisnika, noviKomentar.ID_vijesti],
    (err, res) => {
      if (err) {
        console.error("Greška prilikom unosa komentara:", err);
        result(err, null);
        return;
      }
      console.log("Kreiran komentar:", { id: res.insertId, ...noviKomentar });
      result(null, { id: res.insertId, ...noviKomentar });
    }
  );
};

// dohvat komentara po vijesti
Komentar.getKomentariByVijest = (ID_vijesti, result) => {
  db.query(
    `SELECT k.sadrzaj, k.datum_objave, k.ID_komentara, u.username 
     FROM RWA_komentar k 
     JOIN RWA_korisnik u ON k.ID_korisnika = u.ID_korisnika
     WHERE k.ID_vijesti = ? 
     ORDER BY k.datum_objave DESC`,
    [ID_vijesti],
    (err, res) => {
      if (err) {
        console.error("Greška prilikom dohvaćanja komentara:", err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Komentar;
