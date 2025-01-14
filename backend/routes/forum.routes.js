module.exports = (app) => {
    const forum = require("../controllers/forum.controller.js");

    const router = require("express").Router();

    // Stvori novi forum
    router.post("/", forum.create);

    // Dohvati sve forume
    router.get("/", forum.getAll);

    // Dohvati forum prema ID-u
    router.get("/:id", forum.findByID);

    // Ažuriraj forum
    router.put("/:id", forum.update);

    // Obriši forum
    router.delete("/:id", forum.delete);

    app.use("/api/forumi", router);
};
