// var express = require('express');
// var router = express.Router();
// var indexController = require('../controllers/c_dashboard.js');
// const app = express()
// router.use(express.urlencoded({
//     extended: true
// }))


// router.get('/', indexController.visulogin);
// router.get('/createCar', indexController.createCar);
// router.get('/createEntity', indexController.createEntity);
// router.get('/createFiche', indexController.createFiche);
// router.get('/viewIndemnity', indexController.viewIndemnity);



// module.exports = router;

/* Appel de tous nos outils */
const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);
 
const path = require('path');

const indexController = require('./controllers/c_dashboard.js');

var bodyParser = require('body-parser')

expressApp.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
expressApp.use(bodyParser.json())
 
/* Initialisation des variables */
const router = {
    isStarted: false
};
 
function start(callback) {
    if (router.isStarted === false) {
        init(function () {
            loadRoutes(function () {
                /* Lance le serveur web sur le port 3000 */
                http.listen(3000, function () {
                    console.log('Application is running on port 3000');
                    router.isStarted = true;
                    if (typeof callback != 'undefined') {
                        callback();
                    }
                });
            });
        });
    } else {
        console.log("Application already started");
        if (typeof callback != 'undefined') {
            callback();
        }
    }
}
 
function init(callback) {
    /* On s'assure que le serveur n'est vraiment pas démarré */
    router.isStarted = false;
 
    /* J'utilise ici EJS comme moteur de template */
    expressApp.set('view engine', 'ejs');
 
    /* assets sera le répertoire où se trouverons nos fichiers côté client */
    expressApp.use(express.static(path.join(__dirname, 'assets')));
     
    /* views est défini comme notre dossier de vues par défaut */
    expressApp.set('views', path.join(__dirname, '/views/'));
 
    if (typeof callback != 'undefined') {
        callback();
    }
}
 
/* ROUTES */
 
function loadRoutes(callback) {
    // expressApp.get('/', function (req, res) {
    //     res.render('homepage/index');
    // });

    expressApp.get('/', indexController.visulogin);
    expressApp.post('/login', indexController.login);
    expressApp.get('/inscription', indexController.viewInscription);
    expressApp.post('/inscription', indexController.inscription);
    expressApp.get('/createCar', indexController.viewCreateCar);
    expressApp.post('/createCar', indexController.createCar);
    expressApp.get('/createEntity', indexController.viewCreateEntity);
    expressApp.post('/createEntity', indexController.createEntity);
    expressApp.get('/createFiche', indexController.viewCreateFiche);
    expressApp.post('/createFiche', indexController.createFiche);
    expressApp.get('/viewIndemnity', indexController.viewIndemnity);
 
    if (typeof callback != 'undefined') {
        callback();
    }
}
 
module.exports = {
    start: start
};
