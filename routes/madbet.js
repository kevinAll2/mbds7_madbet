// Assignment est le "modèle mongoose", il est connecté à la base de données
let Madbet = require("../model/madbet");

/* Version sans pagination */
// Récupérer tous les assignments (GET)
/*
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}
*/

// Récupérer tous les assignments (GET), AVEC PAGINATION
function getMadbet(req, res) {
  var aggregateQuery = Madbet.aggregate();
  Madbet.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, madbet) => {
      if (err) {
        console.log(madbet);
        res.send(err);
      }
      console.log(madbet);
      res.send(madbet);
    }
  );
}

// Récupérer un madbet par son id (GET)
/*function getMadbet(req, res) {
  let madbetId = req.params.id;

  Madbet.find({ id: madbetId }, (err, madbet) => {
    if (err) {
      res.send(err);
    }
    console.log(madbet);
    res.json(madbet);
  });
}*/

// Ajout d'un madbet (POST)
function postMadbet(req, res) {
  let madbet = new Madbet();
  madbet.id = req.body.id;
  madbet.nom = req.body.nom;
  madbet.dateDeRendu = req.body.dateDeRendu;
  madbet.rendu = req.body.rendu;

  console.log("POST madbet reçu :");
  console.log(madbet);

  madbet.save((err) => {
    if (err) {
      res.send("cant post madbet ", err);
    }
    res.json({ message: `${madbet.nom} saved!` });
  });
}

// Update d'un madbet (PUT)
function updateMadbet(req, res) {
  console.log("UPDATE recu madbet : ");
  console.log(req.body);
  Madbet.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, madbet) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }

      // console.log('updated ', madbet)
    }
  );
}

// suppression d'un madbet (DELETE)
function deleteMadbet(req, res) {
  Madbet.findByIdAndRemove(req.params.id, (err, madbet) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${madbet.nom} deleted` });
  });
}

module.exports = {
  getMadbet,
  postMadbet,
  getMadbet,
  updateMadbet,
  deleteMadbet,
};
