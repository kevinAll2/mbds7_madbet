let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let matchfoot = require('./routes/matchfoot');
let championship = require('./routes/championship');
let team = require('./routes/team');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s

const uri='mongodb+srv://madbet:madbet@cluster0.njzdj.mongodb.net/madbet?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8020/api/matchfoot que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use((req, res, next) =>  {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8020;

// les routes
const prefix = '/api';

app.route(prefix + '/matchfoot')
  .get(matchfoot.getMatchfootByState)
  .post(matchfoot.postMatchfoot)
  .put(matchfoot.updateMatchfoot);

app.route(prefix + '/championship')
  .get(championship.getAllChampionship)
  .post(championship.postChampionship);
  
app.route(prefix + '/team')
  .get(team.getTeam)
  .post(team.postTeam);

/*app.route(prefix + '/madbet/:id')
  .get(madbet.getMadbet)
  .delete(madbet.deleteMadbet);*/

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;