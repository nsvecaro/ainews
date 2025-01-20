const ForumObjava = require("../models/forumObjava.model.js");

// Middleware za provjeru autentifikacije
const isAuthenticated = (req, res, next) => {
    if (!req.session.korisnikId) {
        return res.status(401).send({ message: "Niste prijavljeni!" });
    }
    next();
};

// Middleware za provjeru uloge
const isAdmin = (req, res, next) => {
    if (req.session.uloga !== "Admin") {
        return res.status(403).send({ message: "Nemate administratorske ovlasti!" });
    }
    next();
};

// Kreiranje nove objave
exports.create = [isAuthenticated, (req, res) => {
    const novaObjava = {
        naslov: req.body.naslov,
        sadrzaj: req.body.sadrzaj,
        slika: req.body.slika || null,
        ID_korisnika: req.session.korisnikId,
        ID_foruma: req.body.ID_foruma,
    };

    ForumObjava.create(novaObjava, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Greška prilikom kreiranja objave.",
            });
        }
        res.send(data);
    });
}];

// Dohvat svih objava u forumu
exports.getAllByForumId = (req, res) => {
    ForumObjava.getAllByForumId(req.params.forumId, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Greška prilikom dohvaćanja objava.",
            });
        }
        res.send(data);
    });
};

// Dohvat jedne objave
exports.getById = (req, res) => {
    ForumObjava.getById(req.params.objavaId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: "Objava nije pronađena.",
                });
            }
            return res.status(500).send({
                message: "Greška prilikom dohvaćanja objave.",
            });
        }
        res.send(data);
    });
};

// Ažuriranje objave
exports.updateById = [isAuthenticated, (req, res) => {
    ForumObjava.updateById(req.params.objavaId, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: "Objava nije pronađena.",
                });
            }
            return res.status(500).send({
                message: "Greška prilikom ažuriranja objave.",
            });
        }
        res.send({ message: "Objava uspješno ažurirana!", data });
    });
}];

// Brisanje objave
exports.removeById = [isAuthenticated, (req, res) => {
    const ID_objave = req.params.objavaId;
    const korisnikId = req.session.korisnikId;
    const korisnikUloga = req.session.uloga;

    // dohvacamo objavu kako bi provjerili koje postao
    ForumObjava.getById(ID_objave, (err, objava) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: "Objava nije pronađena." });
            }
            return res.status(500).send({ message: "Greška prilikom dohvaćanja objave." });
        }

        // Provjera uloge
        if (objava.ID_korisnika !== korisnikId && korisnikUloga !== "Admin") {
            return res.status(403).send({ message: "Nemate dozvolu za brisanje ove objave." });
        }

        // ako je prosla uloga, brisanje
        ForumObjava.removeById(ID_objave, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({ message: "Objava nije pronađena." });
                }
                return res.status(500).send({ message: "Greška prilikom brisanja objave." });
            }
            res.send({ message: "Objava uspješno obrisana!" });
        });
    });
}];
