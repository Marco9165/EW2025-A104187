var mongoose = require('mongoose')
var alunoSchema = new mongoose.Schema({
    _id : String,
    nome : String,
    git : String, 
    tpc1 : String,
    tpc2 : String,
    tpc3 : String,
    tpc4 : String,
    tpc5 : String,
    tpc6 : String,
    tpc7 : String,
    tpc8 : String,
    teste : Number,
    pratica : Number
}, {versionKey : false})

module.exports = mongoose.model('aluno', alunoSchema)

