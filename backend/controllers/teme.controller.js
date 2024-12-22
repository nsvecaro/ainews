const teme = require("../models/teme.model.js");

exports.getAll=(req,res)=>{
    const naslov_teme = req.query.naslov_teme;
    teme.getAll(naslov_teme,(err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Greška pri dohvaćanju tema."
            });
        }else{
            res.send(data);
        }
    });
}