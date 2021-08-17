const Team = require('../model/team');

function getTeam(req, res){
    Team.find((err, Teams) => {
        if(err){
            res.send(err)
        }

        res.send(Teams);
    });
}

function getTeamPagination(req, res) {
    var aggregateQuery = Team.aggregate();
    Team.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 4,
      },
      (err, team) => {
        if (err) {
          res.send(err);
        }
        res.send(team);
      }
    );
  }

  function postTeam(req, res) {
    let team = new Team();
    team.id = req.body.id;
    team.nameTeam = req.body.nameTeam;
    team.save((err) => {
        if (err) {
            res.send("cant post team ", err);
        }
        res.json({ message: `${team.nameTeam} saved!`, team:team});
    });
}

module.exports = {
    getTeam,
    getTeamPagination,
    postTeam
}