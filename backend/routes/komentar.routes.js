module.exports = (app) => {
    const komentar = require("../controllers/komentar.controller.js");
  
    // Kreiranje komentara
    app.post("/komentari", komentar.createKomentar);
  
    // Dohvat svih komentara
    app.get("/komentari", komentar.getAllKomentari);
  
    // Dohvat komentara za određenu vijest
    app.get("/komentari/vijest/:ID_vijesti", komentar.getKomentariByVijest);
  
    // Brisanje komentara po ID-u
    app.delete("/komentari/:ID_komentara", komentar.deleteKomentar);
  };

