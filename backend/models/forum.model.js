const sql = require("./db.js");

// Konstruktor
const Forum = function(forum) {
    this.naziv = forum.naziv;
    this.opis = forum.opis;
    this.ikona = forum.ikona;
};

// Stvaranje novog foruma
Forum.create = (newForum, result) => {
    const query = "INSERT INTO RWA_forum (Naziv, Opis, Ikona) VALUES (?, ?, ?)";
    const values = [newForum.naziv, newForum.opis, newForum.ikona];

    sql.query(query, values, (err, res) => {
        if (err) {
            console.error("Greška pri kreiranju foruma: ", err);
            result(err, null);
            return;
        }
        console.log("Uspješno kreiran forum: ", { id: res.insertId, ...newForum });
        result(null, { id: res.insertId, ...newForum });
       
    });
    

};

// Dohvati sve forume
Forum.getAll = (result) => {
    sql.query("SELECT * FROM RWA_forum ORDER BY Datum_kreiranja DESC", (err, res) => {
        if (err) {
            console.error("Greška pri dohvaćanju foruma: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Dohvati forum po ID-u
Forum.findByID = (id, result) => {
    sql.query("SELECT * FROM RWA_forum WHERE ID_foruma = ?", [id], (err, res) => {
        if (err) {
            console.error("Greška pri dohvaćanju foruma: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// Ažuriraj forum
Forum.updateByID = (id, forum, result) => {
    const query = "UPDATE RWA_forum SET Naziv = ?, Opis = ?, Ikona = ? WHERE ID_foruma = ?";
    const values = [forum.naziv, forum.opis, forum.ikona, id];

    sql.query(query, values, (err, res) => {
        if (err) {
            console.error("Greška pri ažuriranju foruma: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id, ...forum });
    });
};

// Obriši forum
Forum.remove = (id, result) => {
    sql.query("DELETE FROM RWA_forum WHERE ID_foruma = ?", [id], (err, res) => {
        if (err) {
            console.error("Greška pri brisanju foruma: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Forum;
