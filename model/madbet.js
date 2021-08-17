let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");


let Schema = mongoose.Schema;

let MadbetSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});

MadbetSchema.plugin(aggregatePaginate);


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Madbet', MadbetSchema);
