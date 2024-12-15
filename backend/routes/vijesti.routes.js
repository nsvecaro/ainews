module.exports = app => {
    const vijesti = require("../controllers/vijesti.controller.js");

    var router=require("express").Router();

    //napravi novu vjest
    router.post("/", vijesti.create);

    //ucitaj sve vjesti
    router.get("/", vijesti.getAll);

    //ucitaj vijest po ID-u
    router.get("/:id", vijesti.findByID)
    



    app.use('/api/vijesti', router);
}