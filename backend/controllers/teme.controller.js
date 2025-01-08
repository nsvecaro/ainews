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

exports.getById=(req,res)=>{
    teme.getById(req.params.id,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Tema s ID-em ${req.params.id} nije pronađena.`
                });
            }else{
                res.status(500).send({
                    message: `Greška pri dohvaćanju teme s ID-em ${req.params.id}`
                });
            }
        }else{
            res.send(data);
        }
    });
}