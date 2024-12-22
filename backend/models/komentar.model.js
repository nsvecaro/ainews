const sql = require("./db.js");

// Konstruktor za Komentar
const Komentar = function(komentar) {
  this.sadrzaj = komentar.sadrzaj;
  this.datum_objave = komentar.datum_objave;
  this.ID_korisnika = komentar.ID_korisnika;
  this.ID_vijesti = komentar.ID_vijesti;
};

// Kreiranje komentara
Komentar.create = (noviKomentar, result) => {
  sql.query("INSERT INTO RWA_komentar SET ?", noviKomentar, (err, res) => {
    if (err) {
      console.error("Greška prilikom stvaranja komentara: ", err);
      result(err, null);
      return;
    }
    console.log("Komentar kreiran: ", { ID_komentara: res.insertId, ...noviKomentar });
    result(null, { ID_komentara: res.insertId, ...noviKomentar });
  });
};

// Dohvat svih komentara
Komentar.getAll = (result) => {
  sql.query("SELECT * FROM RWA_komentar", (err, res) => {
    if (err) {
      console.error("Greška prilikom dohvaćanja komentara: ", err);
      result(err, null);
      return;
    }
    console.log("Komentari: ", res);
    result(null, res);
  });
};

// Dohvat komentara po ID-u vijesti
Komentar.findByVijestId = (ID_vijesti, result) => {
  sql.query(
    "SELECT * FROM RWA_komentar WHERE ID_vijesti = ?",
    [ID_vijesti],
    (err, res) => {
      if (err) {
        console.error("Greška prilikom dohvaćanja komentara: ", err);
        result(err, null);
        return;
      }
      console.log("Komentari za vijest ID: ", ID_vijesti, res);
      result(null, res);
    }
  );
};

// Brisanje komentara po ID-u
Komentar.remove = (ID_komentara, result) => {
  sql.query("DELETE FROM RWA_komentar WHERE ID_komentara = ?", [ID_komentara], (err, res) => {
    if (err) {
      console.error("Greška prilikom brisanja komentara: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Komentar obrisan s ID: ", ID_komentara);
    result(null, res);
  });
};

module.exports = Komentar;