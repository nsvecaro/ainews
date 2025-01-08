module.exports = app => {
    const vijesti = require("../controllers/vijesti.controller.js");
    const { upload, validateAspectRatio } = require("../middlewares/upload");

    var router = require("express").Router();

    // Kreiraj novu vijest
    router.post("/", vijesti.create);

    // Dohvati sve vijesti
    router.get("/", vijesti.getAll);

    // Dohvati vijest po ID-u
    router.get("/:id", vijesti.findByID);

    // Dohvati najnoviju vijest
    router.get("/latest", vijesti.getLatest);

    // Upload slike s validacijom omjera
    router.post('/upload-image', upload.single('image'), (req, res) => {
        if (!req.file) {
            return res.status(400).send({ message: 'Niste učitali sliku.' });
        }

        res.status(200).send({
            message: 'Slika je uspješno učitana s ispravnim omjerom!',
            filename: req.file.filename,
            path: `/uploads/vijesti/${req.file.filename}`
        });
    });

    app.use('/api/vijesti', router);
};
