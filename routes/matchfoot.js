let Matchfoot = require("../model/matchfoot");


/*function getMatchfootBystate(req, res) {
    var aggregateQuery = Match.aggregate();
    Match.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, match) => {
        if (err) {
          res.send(err);
        }
        res.send(match);
      }
    );  
  }*/

  function getMatchfootByState(req, res) {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    Matchfoot.find()
    .limit(limit)
    .skip(limit * page)
    .exec((err, matchfoots) => {
      if(err) res.send(err);
      res.send(matchfoots);
    })
  }



  function postMatchfoot(req, res) {
    let matchfoot = new Matchfoot();
    matchfoot.id = req.body.id;
    matchfoot.home = req.body.home;
    matchfoot.away = req.body.away;
    matchfoot.championship = req.body.championship;
    matchfoot.cotesHome = req.body.cotesHome;
    matchfoot.cotesAway = req.body.cotesAway;
    matchfoot.cotesDraw = req.body.cotesDraw;
    matchfoot.scoreHome = req.body.scoreHome;
    matchfoot.scoreAway = req.body.scoreAway;
    matchfoot.dateDeMatch = req.body.dateDeMatch;
    matchfoot.pitch = req.body.pitch;
    //matchfoot.etat = req.body.etat;
  
    matchfoot.save((err) => {
      if (err) {
        res.send("cant post matchfoot ", err);
      }
      res.json({ message: `match saved!` });
    });
  }

  
function updateMatchfoot(req, res) {
    console.log("UPDATE recu match : ");
    console.log(req.body);
    Matchfoot.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, matchfoot) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "updated" });
        }
      }
    );
  }

  function deleteMatchfoot(req, res) {
    Matchfoot.findByIdAndRemove(req.params.id, (err, matchfoot) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${matchfoot.id} deleted` });
    });
  }

  module.exports = {
    getMatchfootByState,
    postMatchfoot,
    updateMatchfoot,
    deleteMatchfoot
  }