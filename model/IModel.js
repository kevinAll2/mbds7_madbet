const { ObjectId } = require("bson");

const Championship = {
    _id: ObjectId,
    id: Number,
    nameChampionship: String,
    season: Number
}

const Team = {
    _id: ObjectId,
    id: Number,
    nameTeam: String,
    pitch: String
}

module.exports = {
    Championship,
    Team
}