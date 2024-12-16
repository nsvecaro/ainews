const sql=require("./db.js");

//Constructor
const Vijesti = function(vijest){
    this.naslov=vijest.naslov;
    this.sadrzaj=vijest.sadrzaj;
    this.slika_vijesti=vijest.slika_vijesti;
}

console.log("Vijesti model ucitan");

//Dohvati kreiranje nove vijesti
Vijesti.create = (newVijest, result) => {
    sql.query("INSERT INTO RWA_vijest SET ?", newVijest, (err, res) => {
      if (err) {
        console.log("Greska pri kreiranju vijesti: ", err);
        result(err, null);
        return;
      }
  
      console.log("Uspjesno kreirana nova vijest: ", { id: res.insertId, ...newVijest });
      result(null, { id: res.insertId, ...newVijest });
    });
  };


//Dohvati sve vijesti
Vijesti.getAll = (result) => {
    sql.query( "SELECT * FROM RWA_vijest ORDER BY datum_objave DESC", 
      (err, res) => {
        if (err) {
          console.log("Greska pri dohvacanju vijesti:", err);
          result(null, err);
          return;
        }
        result(null, res);
      }
    );
  };

  //Dohvati vijest po id-u
  Vijesti.findByID = (id, result) => {
    sql.query("SELECT ID_vijesti AS id, naslov, sadrzaj, slika_vijesti, datum_objave FROM RWA_vijest WHERE ID_vijesti = ?", 
      [id], 
      (err, res) => {
        if (err) {
          console.log("Greska pri dohvacanju vijesti:", err);
          result(null, err);
          return;
        }
  
        if (res.length) {
          result(null, res[0]);
          return;
        }
        result({ kind: "not_found" }, null);
      }
    );
  };
  

//Dohvati najnoviju vijest
Vijesti.getLatest = (result) => {
  sql.query(
    "SELECT ID_vijesti AS id, naslov, sadrzaj, slika_vijesti, datum_objave FROM RWA_vijest ORDER BY ID_vijesti DESC LIMIT 1",
    (err, res) => {
      if (err) {
        console.log("Greška pri dohvaćanju najnovije vijesti: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

  module.exports = Vijesti;