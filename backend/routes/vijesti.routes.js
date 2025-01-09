module.exports = (app) => {
    const vijesti = require("../controllers/vijesti.controller.js");
    const { upload } = require("../middlewares/upload");

    var router = require("express").Router();

    // Dohvati top 5 vijesti po broju komentara (specificna ruta mora bit prva)
    router.get("/top-komentari", vijesti.getTopByKomentari);

    // Dohvati najnoviju vijest
    router.get("/latest", vijesti.getLatest);

    // Dohvati sve vijesti
    router.get("/", vijesti.getAll);

    // Kreiraj novu vijest
    router.post("/", vijesti.create);

    // Dohvati vijest po ID-u (dinamicna ruta mora dolazit zadnja!!)
    router.get("/:id", vijesti.findByID);

    // Upload slike
    router.post('/upload-image', upload.single('image'), (req, res) => {
        if (!req.file) {
            return res.status(400).send({ message: 'Niste učitali sliku.' });
        }

        res.status(200).send({
            message: 'Slika je uspješno učitana!',
            filename: req.file.filename,
            path: `/uploads/vijesti/${req.file.filename}`
        });
    });

    app.use('/api/vijesti', router);
};
