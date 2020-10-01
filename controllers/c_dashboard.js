const Entites = require("../models/modelEntites");
const Fiches = require("../models/modelFiches");
const Individus = require("../models/modelIndividus");
const Vehicules = require("../models/modelVehicules");

var express     = require("express"),
request         = require('request'),

app             = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

var controller = {}

controller.visulogin = async (req, res) => {
    res.render('homepage/index', {
        title: "Connexion"
    })
}

controller.login = async (req, res) => {
    const {
        email,
        mdp
      } = req.body
      console.log(email)
      console.log(mdp)
      if (!email || !mdp) {
        // req.session.msgFlash = {
        //   type: "danger",
        //   message: "Donnée manquante"
        // }
        console.log('Donnée manquante')
        res.redirect('/')
      } else {
        try {

            await Individus.sync()
            const indi = await Individus.findAll({})
            const individus = await Individus.findOne( {where : {email: email} } )
            console.log(individus)
            console.log(indi)
            
            if (!individus || (individus.email !== email && individus.mdp !== mdp)) {
                // req.session.msgFlash = {
                //   type: "danger",
                //   message: "Identifiants invalide"
                // }
                console.log('Identifiants invalide 1')
                res.redirect('/')
            } else {
                // req.session.user = individus // use session for user connected
                // console.log(req.session)
                // req.session.msgFlash = {
                //   type: "success",
                //   message: "Bienvenu "
                // }
                console.log('Bienvenu')
                res.redirect('/createCar/')
            }
        } catch (error) {
        //   req.session.msgFlash = {
        //     type: "error",
        //     message: "Identifiants invalide"
        //   }
            console.log(error)
            res.redirect('/', )
        }
      }
}

controller.viewInscription = async (req, res) => {
    res.render('homepage/inscription', {
        title: "Inscription"
    })
}

controller.inscription = async (req, res) => {
    
    await Individus.sync()
    var email = await Individus.findOne({ email: req.body.email})

    if(!email){
        try{
            const individus = await Individus.create({
                nom : req.body.nom,
                prenom : req.body.prenom,
                fonction : req.body.fonction,
                role : "utilisateur",
                email : req.body.email,
                mdp : req.body.mdp   
            });
            const indi = await Individus.findAll({})
            console.log(indi)
        } catch (error) {
            console.log(error)
            res.redirect('/inscription', )
        }
    
        res.render('homepage/index.ejs', {
            title: "Connexion"
        })
    }else{
        res.render('homepage/inscription.ejs', {
            title: "Inscription",
            message: "Cet email existe déjà !"
        })
    }
    
}

controller.vehicules = async (req, res) => {
    await Vehicules.sync()
    const vehicules = await Vehicules.findAll({})

    res.render('dashboard/vehicules.ejs', {
        title: "Liste des véhicules"
    })
}

controller.viewCreateCar = async (req, res) => {
    res.render('dashboard/createCar.ejs', {
        title: "Créer un véhicule"
    })
}

controller.createCar = async (req, res) => {
    await Vehicules.sync()
    const vehicule = await Vehicules.create({
        marque : "test",
        modele : "test",
        puissance : "test",
        annee : "test",
        immatriculation : "test"
    });
    res.render('dashboard/createCar.ejs', {
        title: "Créer une voiture"
    })
}

controller.entites = async (req, res) => {
    await Entites.sync()
    const entites = await Entites.findAll({})

    res.render('dashboard/entites.ejs', {
        title: "Liste des entités"
    })
}

controller.viewCreateEntity = async (req, res) => {
    res.render('dashboard/createEntity.ejs', {
        title: "Créer une entité"
    })
}

controller.createEntity = async (req, res) => {
    const entite = await Entites.create({
        nom : "test",
        type : "test"
    });
    res.render('dashboard/createEntity.ejs', {
        title: "Créer une entité"
    })
}

controller.fiches = async (req, res) => {
    await Fiches.sync()
    const fiches = await Fiches.findAll({})

    res.render('dashboard/fiches.ejs', {
        title: "Liste des fiches"
    })
}

controller.viewCreateFiche = async (req, res) => {
    res.render('dashboard/createFiche.ejs', {
        title: "Créer une fiches"
    })
}

controller.createFiche = async (req, res) => {
    const fiche = await Entites.create({
        compteurDepart : "test",
        compteurArrivee : "test",
        date : "test",
        lieuDepart : "test",
        lieuArrivee : "test",
        commentaire : "test"
    });

    res.render('dashboard/createFiche.ejs', {
        title: "Créer une fiches"
    })
}

controller.viewIndemnity = async (req, res) => {
    res.render('dashboard/viewIndemnity.ejs', {
        title: "Indemnité"
    })
}

controller.individus = async (req, res) => {
    await Individus.sync()
    const individus = await Individus.findAll({})
    console.log(individus)
    res.render('dashboard/individus.ejs', {
        title: "Liste des individus",
        individus : individus
    })
}

controller.dashboard = async (req, res) => {
    res.render('dashboard/dashboard.ejs', {
        title: "Dashboard"
    })
}

module.exports = controller;