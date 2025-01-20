const sql = require("./db.js");

const ForumKomentar = function (komentar) {
    this.sadrzaj = komentar.sadrzaj;
    this.datum_objave = komentar.datum_objave;
    this.ID_objave = komentar.ID_objave;
    this.ID_korisnika = komentar.ID_korisnika;
};

// Kreiranje novog komentara
ForumKomentar.create = (noviKomentar, result) => {
    const query = `
        INSERT INTO RWA_forum_komentar (sadrzaj, ID_objave, ID_korisnika) 
        VALUES (?, ?, ?)
    `;
    const values = [
        noviKomentar.sadrzaj,
        noviKomentar.ID_objave,
        noviKomentar.ID_korisnika,
    ];

    sql.query(query, values, (err, res) => {
        if (err) {
            console.error("Greška prilikom kreiranja komentara:", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...noviKomentar });
    });
};

// Dohvat svih komentara za neku objavu
ForumKomentar.getAllByObjavaId = (ID_objave, result) => {
    const query = `
        SELECT k.ID_f_komentar, k.sadrzaj, k.datum_objave, 
               u.username AS autor 
        FROM RWA_forum_komentar k
        JOIN RWA_korisnik u ON k.ID_korisnika = u.ID_korisnika
        WHERE k.ID_objave = ?
        ORDER BY k.datum_objave DESC
    `;
    sql.query(query, [ID_objave], (err, res) => {
        if (err) {
            console.error("Greška prilikom dohvaćanja komentara:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Dohvat jednog komentara
ForumKomentar.getById = (ID_f_komentar, result) => {
    const query = `
        SELECT k.ID_f_komentar, k.sadrzaj, k.datum_objave, 
               u.username AS autor, k.ID_korisnika, k.ID_objave
        FROM RWA_forum_komentar k
        JOIN RWA_korisnik u ON k.ID_korisnika = u.ID_korisnika
        WHERE k.ID_f_komentar = ?
    `;
    sql.query(query, [ID_f_komentar], (err, res) => {
        if (err) {
            console.error("Greška prilikom dohvaćanja komentara:", err);
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

// Ažuriranje komentara
ForumKomentar.updateById = (ID_f_komentar, komentar, result) => {
    const query = `
        UPDATE RWA_forum_komentar 
        SET sadrzaj = ? 
        WHERE ID_f_komentar = ?
    `;
    sql.query(query, [komentar.sadrzaj, ID_f_komentar], (err, res) => {
        if (err) {
            console.error("Greška prilikom ažuriranja komentara:", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
        } else {
            result(null, { id: ID_f_komentar, ...komentar });
        }
    });
};

// Brisanje komentara
ForumKomentar.removeById = (ID_f_komentar, result) => {
    sql.query(
        "DELETE FROM RWA_forum_komentar WHERE ID_f_komentar = ?",
        [ID_f_komentar],
        (err, res) => {
            if (err) {
                console.error("Greška prilikom brisanja komentara:", err);
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

module.exports = ForumKomentar;
