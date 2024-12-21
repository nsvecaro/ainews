const db = require("../models/db.js"); 
const bcrypt = require("bcrypt");

const Korisnik = function (korisnik) {
  this.username = korisnik.username;
  this.lozinka = korisnik.lozinka;
  this.email = korisnik.email;
  this.uloga = korisnik.uloga || "Guest";
};

// Kreiranje korisnika
Korisnik.createKorisnik = async (noviKorisnik, result) => {
  try {
    if (!noviKorisnik.lozinka) {
        return result({ message: "Lozinka je obavezna!" }, null);
      }
    // Hashiranje lozinke
    const hashedPassword = await bcrypt.hash(noviKorisnik.lozinka, 10);

    // SQL upit za unos novog korisnika
    db.query(
      `INSERT INTO RWA_korisnik (username, lozinka, email, uloga) VALUES (?, ?, ?, ?)`,
      [noviKorisnik.username, hashedPassword, noviKorisnik.email, noviKorisnik.uloga],
      (err, res) => {
        if (err) {
          console.error("Greška prilikom kreiranja korisnika:", err);
          result(err, null);
          return;
        }
        console.log("Kreiran korisnik:", { id: res.insertId, ...noviKorisnik });
        result(null, { id: res.insertId, ...noviKorisnik });
      }
    );
  } catch (err) {
    console.error("Greška prilikom hashiranja lozinke:", err);
    result(err, null);
  }
};

// Dohvat svih korisnika
Korisnik.getKorisnik = (result) => {
  db.query(`SELECT * FROM RWA_korisnik`, (err, res) => {
    if (err) {
      console.error("Greška prilikom dohvaćanja korisnika:", err);
      result(null, err);
      return;
    }
    console.log("Korisnici:", res);
    result(null, res);
  });
};

// Dohvat korisnika po ID-u
Korisnik.getKorisnikById = (id, result) => {
  db.query(`SELECT * FROM RWA_korisnik WHERE ID_korisnika = ?`, [id], (err, res) => {
    if (err) {
      console.error("Greška prilikom dohvaćanja korisnika po ID-u:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Pronađen korisnik:", res[0]);
      result(null, res[0]);
      return;
    }

    
    result({ kind: "not_found" }, null);
  });
};

Korisnik.loginKorisnik = (username, lozinka, result) => {
    console.log(`Tražimo korisnika s usernameom: ${username}`); // Debug
  
    db.query(
      `SELECT * FROM RWA_korisnik WHERE username = ?`,
      [username],
      (err, res) => {
        if (err) {
          console.error("Greška pri dohvaćanju korisnika:", err);
          return result(err, null);
        }
  
        if (res.length === 0) {
          console.log("Korisnik nije pronađen.");
          return result({ kind: "not_found" }, null);
        }
  
        const korisnik = res[0]; 
        console.log("Pronađen korisnik:", korisnik); // Debug
  
        bcrypt.compare(lozinka, korisnik.lozinka, (err, isMatch) => {
          if (err) {
            console.error("Greška pri provjeri lozinke:", err);
            return result(err, null);
          }
  
          if (isMatch) {
            console.log("Lozinka je ispravna!"); // Debug
            result(null, {
              id: korisnik.ID_korisnika,
              username: korisnik.username,
              email: korisnik.email,
              uloga: korisnik.uloga,
            });
          } else {
            console.log("Lozinka nije ispravna."); //konzola za provjeru
            result({ kind: "invalid_password" }, null);
          }
        });
      }
    );
  };
  

module.exports = Korisnik;
