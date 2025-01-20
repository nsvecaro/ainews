module.exports = (app) => {
    const forumKomentar = require("../controllers/forumKomentar.controller.js");

    const router = require("express").Router();

    // Kreiranje novog komentara
    router.post("/", forumKomentar.create);

    // Dohvat svih komentara za neku objavu
    router.get("/:objavaId", forumKomentar.getAllByObjavaId);

    // Dohvat jednog komentara
    router.get("/komentar/:komentarId", forumKomentar.getById);

    // Ažuriranje komentara
    router.put("/komentar/:komentarId", forumKomentar.updateById);

    // Brisanje komentara
    router.delete("/komentar/:komentarId", forumKomentar.removeById);

    app.use("/api/forumKomentar", router);
};
