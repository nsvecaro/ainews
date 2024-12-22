const Vijesti = require("../models/vijesti.model.js");

// Kreiranje nove vijesti
exports.create = (req, res) => {
  console.log("Podaci primljeni: ", req.body);
    // Validacija
    if (!req.body.naslov || !req.body.sadrzaj) {
      res.status(400).send({
        message: "Naslov i sadrzaj ne mogu biti prazni!",
      });
      return;
    }
  
    // Nova vijest
    const novaVijest = {
      naslov: req.body.naslov,
      sadrzaj: req.body.sadrzaj,
      slika_vijesti: req.body.slika_vijesti || null,
      autor: req.body.autor || 'Nepoznato',
      ID_teme: req.body.ID_teme,
    };
  
    // Spremanje vijesti u bazu
    Vijesti.create(novaVijest, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Dogodila se greska pri kreiranju nove vijesti.",
        });
      } else {
        res.send(data); // Vracanje kreirane vijesti
      }
    });
  };


  // Dohvat svih vijesti
exports.getAll = (req, res) => {
    Vijesti.getAll((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Dogodila se greška pri dohvaćanju vijesti.",
        });
      } else {
        res.send(data); // Vraca popis svih vijesti
      }
    });
  };
  
  
  // Dohvat vijesti prema ID-u
  exports.findByID = (req, res) => {
    const id = req.params.id; // ID iz URL-a
  
    Vijesti.findByID(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Vijest s ID-om ${id} nije pronađena.`,
          });
        } else {
          res.status(500).send({
            message: `Greška pri dohvaćanju vijesti s ID-om ${id}.`,
          });
        }
      } else {
        res.send(data); // Vraca pronađenu vijest
      }
    });
  };

  //Najnovija vijest
  exports.getLatest = (req, res) => {
    Vijesti.getLatest((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Dogodila se greška pri dohvaćanju najnovije vijesti.",
        });
      } else {
        res.send(data);
      }
    });
  };