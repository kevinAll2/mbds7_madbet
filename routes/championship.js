const Championship = require('../model/championship');

function getAllChampionship(req, res){
    Championship.find((err, championships) => {
        if(err){
            res.send(err)
        }
        res.send(championships);
    });
}

function getChampionship(req, res) {
    var aggregateQuery = Professeur.aggregate();
    Championship.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 4,
      },
      (err, championship) => {
        if (err) {
          res.send(err);
        }
        res.send(championship);
      }
    );
  }

  function postChampionship(req, res) {
    let championship = new Championship();
    championship.id = req.body.id;
    championship.nameChampionship = req.body.nameChampionship;
    championship.season = req.body.season;
    championship.save((err) => {
        if (err) {
            res.send("cant post championship ", err);
        }
        res.json({ message: `${championship.nameChampionship} saved!`, championship:championship});
    });
}

module.exports = {
    getAllChampionship,
    getChampionship,
    postChampionship
}