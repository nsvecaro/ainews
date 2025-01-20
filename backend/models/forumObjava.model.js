const sql = require("./db.js");

const ForumObjava = function (forumObjava) {
    this.naslov = forumObjava.naslov;
    this.sadrzaj = forumObjava.sadrzaj;
    this.slika = forumObjava.slika;
    this.datum_objave = forumObjava.datum_objave;
    this.ID_korisnika = forumObjava.ID_korisnika;
    this.ID_foruma = forumObjava.ID_foruma;
};

// Kreiranje nove objave
ForumObjava.create = (novaObjava, result) => {
    const query = `
        INSERT INTO RWA_forum_objava (naslov, sadrzaj, slika, ID_korisnika, ID_foruma) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
        novaObjava.naslov,
        novaObjava.sadrzaj,
        novaObjava.slika,
        novaObjava.ID_korisnika,
        novaObjava.ID_foruma,
    ];

    sql.query(query, values, (err, res) => {
        if (err) {
            console.error("Greška prilikom kreiranja objave:", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...novaObjava });
    });
};

// Dohvat svih objava u forumu
ForumObjava.getAllByForumId = (ID_foruma, result) => {
    const query = `
        SELECT o.ID_objave, o.naslov, o.sadrzaj, o.slika, o.datum_objave, 
               k.username AS autor, f.Naziv AS forum 
        FROM RWA_forum_objava o
        JOIN RWA_korisnik k ON o.ID_korisnika = k.ID_korisnika
        JOIN RWA_forum f ON o.ID_foruma = f.ID_foruma
        WHERE o.ID_foruma = ?
        ORDER BY o.datum_objave DESC
    `;
    sql.query(query, [ID_foruma], (err, res) => {
        if (err) {
            console.error("Greška prilikom dohvaćanja objava:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Dohvat pojedinačne objave
ForumObjava.getById = (ID_objave, result) => {
    const query = `
        SELECT o.ID_objave, o.naslov, o.sadrzaj, o.slika, o.datum_objave, 
               k.username AS autor, f.Naziv AS forum, o.ID_korisnika
        FROM RWA_forum_objava o
        JOIN RWA_korisnik k ON o.ID_korisnika = k.ID_korisnika
        JOIN RWA_forum f ON o.ID_foruma = f.ID_foruma
        WHERE o.ID_objave = ?
    `;
    sql.query(query, [ID_objave], (err, res) => {
        if (err) {
            console.error("Greška prilikom dohvaćanja objave:", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};

// Ažuriranje objave
ForumObjava.updateById = (ID_objave, objava, result) => {
    const query = `
        UPDATE RWA_forum_objava 
        SET naslov = ?, sadrzaj = ?, slika = ?
        WHERE ID_objave = ?
    `;
    const values = [objava.naslov, objava.sadrzaj, objava.slika, ID_objave];

    sql.query(query, values, (err, res) => {
        if (err) {
            console.error("Greška prilikom ažuriranja objave:", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
        } else {
            result(null, { id: ID_objave, ...objava });
        }
    });
};

// Brisanje objave
ForumObjava.removeById = (ID_objave, result) => {
    sql.query(
        "DELETE FROM RWA_forum_objava WHERE ID_objave = ?",
        [ID_objave],
        (err, res) => {
            if (err) {
                console.error("Greška prilikom brisanja objave:", err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null);
            } else {
                result(null, res);
            }
        }
    );
};

module.exports = ForumObjava;
