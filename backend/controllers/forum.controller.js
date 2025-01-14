const Forum = require("../models/forum.model.js");

// Kreiranje novog foruma
exports.create = (req, res) => {
    if (!req.body.naziv) {
        res.status(400).send({ message: "Naziv foruma je obavezan!" });
        return;
    }

    const newForum = {
        naziv: req.body.naziv,
        opis: req.body.opis || null,
        ikona: req.body.ikona || null,
    };

    Forum.create(newForum, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Greška pri kreiranju foruma.",
            });
        else res.send(data);
    });
};

// Dohvat svih foruma
exports.getAll = (req, res) => {
    Forum.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Greška pri dohvaćanju foruma.",
            });
        else res.send(data);
    });
};

// Dohvat foruma prema ID-u
exports.findByID = (req, res) => {
    Forum.findByID(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Forum s ID-om ${req.params.id} nije pronađen.`,
                });
            } else {
                res.status(500).send({
                    message: `Greška pri dohvaćanju foruma s ID-om ${req.params.id}.`,
                });
            }
        } else res.send(data);
    });
};

// Ažuriranje foruma
exports.update = (req, res) => {
    if (!req.body.naziv) {
        res.status(400).send({ message: "Naziv foruma ne može biti prazan!" });
        return;
    }

    Forum.updateByID(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Forum s ID-om ${req.params.id} nije pronađen.`,
                });
            } else {
                res.status(500).send({
                    message: `Greška pri ažuriranju foruma s ID-om ${req.params.id}.`,
                });
            }
        } else res.send(data);
    });
};

// Brisanje foruma
exports.delete = (req, res) => {
    Forum.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Forum s ID-om ${req.params.id} nije pronađen.`,
                });
            } else {
                res.status(500).send({
                    message: `Greška pri brisanju foruma s ID-om ${req.params.id}.`,
                });
            }
        } else res.send({ message: `Forum uspješno obrisan!` });
    });
};
