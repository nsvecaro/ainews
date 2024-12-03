const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Konekcija na bazu
const connection = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "mtauzer",
  password: "11",
  database: "mtauzer",
});

connection.connect((err) => {
  if (err) {
    console.error("Greška pri povezivanju na bazu:", err);
    throw err;
  }
  console.log("Povezano na bazu!");
});

// API za registraciju
app.post("/api/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validacija podataka
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Sva polja su obavezna." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Lozinke se ne podudaraju." });
  }

  try {
    // Hashiranje lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    // Provjera postojanja korisnika
    connection.query(
      "SELECT * FROM RWA_korisnik WHERE Email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Greška pri provjeri korisnika:", err);
          return res.status(500).json({ message: "Greška na serveru." });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: "Korisnik već postoji." });
        }

        // Umetanje korisnika u bazu
        const query = `
          INSERT INTO RWA_korisnik (Username, Lozinka, Email)
          VALUES (?, ?, ?)
        `;
        connection.query(query, [username, hashedPassword, email], (err) => {
          if (err) {
            console.error("Greška pri unosu korisnika:", err);
            return res.status(500).json({ message: "Greška na serveru." });
          }

          res.status(201).json({ message: "Korisnik uspješno registriran!" });
        });
      }
    );
  } catch (error) {
    console.error("Greška:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server pokrenut na portu ${port}`);
});

