module.exports = (app) => {
    const forumObjava = require("../controllers/forumObjava.controller.js");

    const router = require("express").Router();

    // Kreiranje nove objave
    router.post("/", forumObjava.create);

    // Dohvat svih objava u forumu
    router.get("/:forumId", forumObjava.getAllByForumId);

    // Dohvat jedne objave
    router.get("/objava/:objavaId", forumObjava.getById);

    // Ažuriranje objave
    router.put("/objava/:objavaId", forumObjava.updateById);

    // Brisanje objave
    router.delete("/objava/:objavaId", forumObjava.removeById);

    app.use("/api/forumObjava", router);
};
