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

    // Pošaljemo podatke korisniku uključujući njegovu ulogu
    res.send({
      message: "Prijava uspješna",
      korisnikIme: korisnik.username,
      uloga: korisnik.uloga,  // Dodajemo ulogu korisnika
    });
  });
};



// Promjena korisničkog imena
// Promjena korisničkog imena
exports.updateUsername = (req, res) => {
  const { id } = req.params;
  const { newUsername } = req.body;

  if (!newUsername) {
    return res.status(400).send({ message: "Novo korisničko ime je obavezno!" });
  }

  Korisnik.updateUsername(id, newUsername, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: `Korisnik s ID-om ${id} nije pronađen.` });
      }
      return res.status(500).send({ message: "Greška prilikom ažuriranja korisničkog imena." });
    }
    res.send({ message: "Korisničko ime uspješno promijenjeno!", data });
  });
};

// Promjena lozinke korisnika
exports.updatePassword = (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).send({ message: "Trenutna i nova lozinka su obavezne!" });
  }

  Korisnik.getKorisnikById(id, async (err, korisnik) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: `Korisnik s ID-om ${id} nije pronađen.` });
      }
      return res.status(500).send({ message: "Greška prilikom dohvaćanja korisnika." });
    }

    // Provjera trenutne lozinke
    const isMatch = await bcrypt.compare(currentPassword, korisnik.lozinka);
    if (!isMatch) {
      return res.status(401).send({ message: "Trenutna lozinka nije ispravna." });
    }

    // Hashiranje nove lozinke
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Ažuriranje lozinke u bazi
    Korisnik.updatePassword(id, hashedPassword, (err, data) => {
      if (err) {
        return res.status(500).send({ message: "Greška prilikom ažuriranja lozinke." });
      }
      res.send({ message: "Lozinka uspješno promijenjena!" });
    });
  });
};
