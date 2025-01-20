const ForumKomentar = require("../models/forumKomentar.model.js");

// Middleware za autentifikaciju
const isAuthenticated = (req, res, next) => {
    if (!req.session.korisnikId) {
        return res.status(401).send({ message: "Niste prijavljeni!" });
    }
    next();
};

// Kreiranje novog komentara
exports.create = [isAuthenticated, (req, res) => {
    const noviKomentar = {
        sadrzaj: req.body.sadrzaj,
        ID_objave: req.body.ID_objave,
        ID_korisnika: req.session.korisnikId,
    };

    ForumKomentar.create(noviKomentar, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Greška prilikom kreiranja komentara.",
            });
        }
        res.send(data);
    });
}];

// Dohvat svih komentara za objavu
exports.getAllByObjavaId = (req, res) => {
    ForumKomentar.getAllByObjavaId(req.params.objavaId, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Greška prilikom dohvaćanja komentara.",
            });
        }
        res.send(data);
    });
};

// Dohvat jednog komentara
exports.getById = (req, res) => {
    ForumKomentar.getById(req.params.komentarId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: "Komentar nije pronađen.",
                });
            }
            return res.status(500).send({
                message: "Greška prilikom dohvaćanja komentara.",
            });
        }
        res.send(data);
    });
};

// Ažuriranje komentara
exports.updateById = [isAuthenticated, (req, res) => {
    const komentarId = req.params.komentarId;
    const korisnikId = req.session.korisnikId;
    const korisnikUloga = req.session.uloga;

    ForumKomentar.getById(komentarId, (err, komentar) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: "Komentar nije pronađen." });
            }
            return res.status(500).send({ message: "Greška prilikom dohvaćanja komentara." });
        }

        // provjera uloge
        if (komentar.ID_korisnika !== korisnikId && korisnikUloga !== "Admin") {
            return res.status(403).send({ message: "Nemate dozvolu za ažuriranje ovog komentara." });
        }

        ForumKomentar.updateById(komentarId, req.body, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({ message: "Komentar nije pronađen." });
                }
                return res.status(500).send({ message: "Greška prilikom ažuriranja komentara." });
            }
            res.send({ message: "Komentar uspješno ažuriran!", data });
        });
    });
}];

// Brisanje komentara
exports.removeById = [isAuthenticated, (req, res) => {
    const komentarId = req.params.komentarId;
    const korisnikId = req.session.korisnikId;
    const korisnikUloga = req.session.uloga;

    ForumKomentar.getById(komentarId, (err, komentar) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: "Komentar nije pronađen." });
            }
            return res.status(500).send({ message: "Greška prilikom dohvaćanja komentara." });
        }

        // provjera uloge
        if (komentar.ID_korisnika !== korisnikId && korisnikUloga !== "Admin") {
            return res.status(403).send({ message: "Nemate dozvolu za brisanje ovog komentara." });
        }

        ForumKomentar.removeById(komentarId, (err, data) => {
            if (err) {
                return res.status(500).send({ message: "Greška prilikom brisanja komentara." });
            }
            res.send({ message: "Komentar uspješno obrisan!" });
        });
    });
}];
