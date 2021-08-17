let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Championship = require('./IModel').Championship;
const Team = require('./IModel').Team;

let Schema = mongoose.Schema;

let MatchfootSchema = Schema({
    id : Number,
    home: Team,
    away: Team,
    championship: Championship,
    cotesHome: Number,
    cotesAway: Number,
    cotesDraw: Number,
    scoreHome: Number,
    scoreAway: Number,
    dateDeMatch: Date,
    pitch: String
});

MatchfootSchema.plugin(aggregatePaginate);


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('madbet', MatchfootSchema);