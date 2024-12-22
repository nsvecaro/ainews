const sql = require("./db.js");

const Teme = function(tema) {
    this.naslov_teme = tema.naslov_teme;
}

Teme.getAll = (naslov_teme, result) => {
    let query = "SELECT * FROM RWA_tema";
    if(naslov_teme){
        query += " WHERE naslov_teme LIKE ?";
    }

    sql.query(query, naslov_teme ? [`%${naslov_teme}%`] : [], (err, res) => {
        if(err){
            console.error("Greška pri dohvaćanju tema:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = Teme;
