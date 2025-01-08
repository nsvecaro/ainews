module.exports = app => { 
    const teme = require("../controllers/teme.controller.js");

    var router = require("express").Router();

    router.get("/", teme.getAll);

    router.get("/:id", teme.getById);

    app.use('/api/teme', router);
}
