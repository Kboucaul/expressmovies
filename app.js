/*
**  1/  On require le module express
**      apres l'avoir installé avec 
**      npm install express --save
*/
const express = require('express');


/*
**  2/  On crée une instance de notre application
**      Ici express est une méthode.
**      C'est un peu comme un new Express().
*/
const app = express();

/*
**  On fait un require du middleware body-parser
**  Pour gerer les requetes en get
*/

const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
//Pour utiliser un middleware on utilise app.use
app.use(bodyParser.urlencoded({ extended: false }));


/*
**  On fait un require de axios
*/

const axios = require('axios');

/*
**  On installe multer pour permetre de poster un
**  formulaire avec ajax. 
*/

var multer  = require('multer');
var upload = multer();

/*
**  Obligation d'utiliser un middleware pour le fichier css
**  (middleware = qui permetvd'ajouter des fonctionnalités
**  supplémentaires)
**
**  app.use() => quels middlewares veut on ajouter?
**
**  ici le chemin /public est préfixé pour les fichiers statiques.
*/

app.use('/public', express.static('public'))

/*
**  Le probleme ici c'est que l'on est limité dans la
**  reponse renvoyée.
**  Théoriquement on pourrait renvoyer des div/formulaire
**  mais c'est laid et complexe a mettre en place.
**
**  On va donc utiliser le module EJS qui est un moteur
**  de template javascript.
**
**  On l'installe avec la commande :
**  npm install ejs --save (on le veut en prod)
*/

/*
**  On indique a node que l'on va avoir des views dans le
**  dossier ./views.
*/
app.set('vews', './views');

/*
**  On indique le "view engines" utilisé.
**  Ici c'est ejs.
*/

app.set('view engine', 'ejs');

/*
**  Maintenant on peut creer notre premiere view dans ./views
*/

let films = [
    {title: 'Le seigneur des anneaux', year: 2001},
    {title: 'Inception', year: 2010},
    {title: 'Willow', year: 1988},
    {title: 'Le dernier des Mohicans', year: 1992},
    {title: 'Mission', year: 1986}, 
    {title: 'Titanic', year: 1997}
];

/*
**  ===========CREATION DES ROUTES==============
**
**  /!\ Les routes spécifiques doivent etre déclarées
**  le plus "haut" possible. (en premiere).
**  
**    3/ Cette méthode get prend 2 parametres
**      1-  La route tapé dans l'url
**      2-  Un callback => action qu'il va faire.
**          2 parametres dans ce callback
**              -> la requete de l'utilisateur
**              -> la réponse du serveur
**
**  /!\ Ici get correspond au verbe HTTP GET
**
**  On renvoie Un hello world grace a la methode
**  send de req.
**
**  La réponse est de type html, on peut donc
**  inclure des balises html.
*/

/*
**  Ici notre route prend un parametre (id)
**  On pourra afficher des details pour ce film !
*/
app.get('/movies/:id', (req, res) => {
    //On recupere l'id
    const id = req.params.id;
    /*
    **  Ici on passe id au template.
    **  On pourra ainsi l'utiliser.
    **  On passe bien un OBJET contenant
    **  une propriété id.
    */
    res.render('movie-details', 
        {
            id,
            title : "Le hobbit : La désolation de Smaug"
        }
    );
});

app.get('/movie-search', (req, res) => {
    res.render('movie-search', {
        axios
    });
})

/*
**  En get sur /movies
*/

app.get('/movies', (req, res) => {
    res.render('movies', {
        films: films
    });
});

/*
**  En post sur /moves (pour le formulaire)
**  Sinon erreur 404
*/

let urlEncodedParser = bodyParser.urlencoded({ extended: false })

/*
**  Ce middleWare ne rentrera en action que sur cette route
*/
//app.post('/movies', urlEncodedParser, (req, res) => {
    /*  On recupere les données postées
    **  Obligation de passer par un middleWare
    **  On agit bien sur req et pas sur res
    **  On doit ouvrir une console côté serveur
    **  ex : console ou on a lancé node
    */

    /*
    **  Ici on recupere granulairement 
    */
  //  const title = req.body.movietitle;
  //  const year = req.body.movieyear;
    
   //On ajoute le film
    //    const newMovie = {
    //        'title': title,
    //        'year':  year
    //    }
        //films.push(newMovie);
            //ou
    //    films = [... films, newMovie];

    //On doit toujours renvoyer quelque chose
    //=> Sinon le serveur tourne a l'infini
    //res.sendStatus(201); //Status quand on a crée qqchose
//});


/*
**  Ici on post le formulaire mais avec multer
*/
app.post('/movies', upload.fields([]), (req, res) => {
    if (req.body)
    {
        const formData = req.body;
        console.log(formData);
        
        const title = req.body.movietitle;
        const year = req.body.movieyear;
    
    //On ajoute le film
        const newMovie = {
            'title': title,
            'year':  year
        }
        //films.push(newMovie);
            //ou
        films = [... films, newMovie];
        return res.sendStatus(201);
    }
    else
    {
        return res.sendStatus(500);
    }
});


app.get('/series', (req, res) => {
    res.render('series.ejs');
});

/*
**  Ici on utilise la methode render pour indiquer que
**  l'on veut "rendre un template".
*/
app.get('/', (req, res) => {
    //On ne met pas le chemin car on l'a indiqué dans set.
    //Ni le .ejs
    res.render('index', 
    {
        title: "Express Movies",
    });
});

/*
**  4/  On crée une variable qui stockera le port utilisé,
**      c'est plus maintenable que de l'écrire en dur.
*/
const PORT = 3000;


/*
**  ==================================
**  ===========Requete API============
**  ==================================
*/



/*
**  5/  On doit écouter sur un port.
**          Ici c'est le port 3000.
**          2 parametres :
**              -1 Le port.
**              -2 Un callback, ici on indique au dev
**              sur quel port on écoute.
*/

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

/*
**  6/  A partir de la on peut lancer l'application'.
**      node app.js.
**      On peut donc se rendre sur l'addresse :
**      http://localhost:3000
*/


/*
**  /!\ CONSEIL : Installer le package nodemon pour ne
**  pas relancer le serveur a chaque modifications de
**  fichiers.
**
**  Il ne sert qu'en dev
**  => npm install -g nodemon --save-dev
**      ->  Ajoute une propriete dans package.json dans
**          les dev-dependencies.
**
**  Maintenant on peut faire nodemon app.js
**
**
**  Une autre bonne pratique qui permet aux autres
**  developpeurs de comprendre comment lancer le projet
**  par exemple est d'utiliser l'entrée script dans
**  package.json.
**  Et de créer une nouvelle propriété "start": "node app.js".
**  Maintenant les utilisateurs pourront faire un npm start
**  pour lancer l'application.
**
**  On peut aussi lancer nodemon
**  On ajoute l'entrée dans script : 
**  "dev": "nodemon app.js"
**
**  /!\ On est obligé d elancer la commande suivante 
**      "npm run dev". (car npm start === npm run start avec un alias)
*/


