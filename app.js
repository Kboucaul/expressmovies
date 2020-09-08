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
**  Cette route est déclarée en premiere car c'est la plus spécifique !
*/
app.get('/movies/add', (req, res) => {
    res.send(`<h1 style="text-align:center"> L'ajout des films est bientôt disponible !</h1>`);
});
/*
**  Ici notre route prend un parametre (id)
**  On pourra afficher des details pour ce film !
*/
app.get('/movies/:id', (req, res) => {
    //On recupere l'id
    const id = req.params.id;
    res.send(`<h1 style="text-align:center"> Détails du film n°${id} !</h1>`);
});


app.get('/movies', (req, res) => {
    res.send('<h1 style="text-align:center"> Voici nos films !</h1>');
});

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center"> Hello tout le monde !</h1>');
});

/*
**  4/  On crée une variable qui stockera le port utilisé,
**      c'est plus maintenable que de l'écrire en dur.
*/
const PORT = 3000;

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
