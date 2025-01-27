const sql = require("./db.js");

// Konstruktor
const Vijesti = function(vijest) {
    this.naslov = vijest.naslov;
    this.sadrzaj = vijest.sadrzaj;
    this.slika_vijesti = vijest.slika_vijesti;
    this.autor = vijest.autor;
    this.ID_teme = vijest.id_teme;
};

console.log("Vijesti model učitan");

// Stvaranje nove vijesti
Vijesti.create = (newVijest, result) => {
    const query = "INSERT INTO RWA_vijest (naslov, sadrzaj, slika_vijesti, autor, ID_teme) VALUES (?, ?, ?, ?, ?)";
    const values = [newVijest.naslov, newVijest.sadrzaj, newVijest.slika_vijesti, newVijest.autor, newVijest.ID_teme];

    sql.query(query, values, (err, res) => {
        if (err) {
            console.error("Greška pri kreiranju vijesti: ", err);
            result(err, null);
            return;
        }

        console.log("Uspješno kreirana vijest: ", { id: res.insertId, ...newVijest });
        result(null, { id: res.insertId, ...newVijest });
    });
};

// Dohvati sve vijesti
Vijesti.getAll = (result) => {
    sql.query("SELECT * FROM RWA_vijest ORDER BY datum_objave DESC", (err, res) => {
        if (err) {
            console.error("Greška pri dohvaćanju vijesti:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Dohvati vijest po ID-u
Vijesti.findByID = (id, result) => {
    sql.query("SELECT ID_vijesti AS id, naslov, sadrzaj, slika_vijesti, autor, datum_objave FROM RWA_vijest WHERE ID_vijesti = ?", [id], (err, res) => {
        if (err) {
            console.error("Greška pri dohvaćanju vijesti:", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// Dohvati najnoviju vijest
Vijesti.getLatest = (result) => {
    sql.query("SELECT ID_vijesti AS id, naslov, sadrzaj, slika_vijesti, autor, tema, datum_objave FROM RWA_vijest ORDER BY ID_vijesti DESC LIMIT 1", (err, res) => {
        if (err) {
            console.error("Greška pri dohvaćanju najnovije vijesti: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// Dohvati top 5 vijesti po broju komentara (u frontendu zasad prikazujem 4 posto u bazi ima 4 vijesti)
Vijesti.getTopByKomentari = (result) => {
    const query = `
        SELECT 
            v.ID_vijesti AS id, 
            v.naslov AS title, 
            v.slika_vijesti AS image, 
            COUNT(k.ID_komentara) AS brojKomentara
        FROM RWA_vijest v
        LEFT JOIN RWA_komentar k ON v.ID_vijesti = k.ID_vijesti
        GROUP BY v.ID_vijesti
        ORDER BY brojKomentara DESC
        LIMIT 5; 
    `; 

    sql.query(query, (err, res) => {
        if (err) {
            console.error("Greška pri dohvaćanju top vijesti: ", err);
            result(err, null);
            return;
        }

        result(null, res);
    });
};

// Dohvati vijesti po temi
Vijesti.findByTema = (temaId, result) => {
    const query = "SELECT * FROM RWA_vijest WHERE ID_teme = ? ORDER BY datum_objave DESC";
    sql.query(query, [temaId], (err, res) => {
      if (err) {
        console.error("Greška pri dohvaćanju vijesti za temu:", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
  
      result({ kind: "not_found" }, null);
    });
  };

module.exports = Vijesti;