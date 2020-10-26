const Entites = require("../models/modelEntites");
const Fiches = require("../models/modelFiches");
const Individus = require("../models/modelIndividus");
const Vehicules = require("../models/modelVehicules");
const Objet = require("../models/modelObjet");


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
        req.session.msgFlash = {
          type: "danger",
          message: "Donnée manquante"
        }
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
                req.session.msgFlash = {
                  type: "danger",
                  message: "Identifiants invalide"
                }
                console.log('Identifiants invalide 1')
                res.redirect('/')
            } else {
                req.session.user = individus // use session for user connected
                console.log(req.session.user.id)
                req.session.msgFlash = {
                  type: "success",
                  message: "Bienvenu "
                }
                console.log('Bienvenu')
                res.redirect('/dashboard/')
            }
        } catch (error) {
          req.session.msgFlash = {
            type: "error",
            message: "Identifiants invalide"
          }
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
        title: "Liste des véhicules",
        vehicules: vehicules
    })
}

controller.viewCreateCar = async (req, res) => {
    res.render('dashboard/createCar.ejs', {
        title: "Créer un véhicule"
    })
}

controller.createCar = async (req, res) => {
    await Vehicules.sync()
    var immatriculation = await Vehicules.findOne({ immatriculation: req.body.immatriculation})
    
    if(!immatriculation){
        try{
            const vehicule = await Vehicules.create({
                marque : req.body.marque,
                modele : req.body.modele,
                puissance : req.body.puissance,
                annee : req.body.annee,
                immatriculation : req.body.immatriculation,
                id_individus: req.session.user.id
            });

        } catch (error) {
            console.log(error)
            res.redirect('/createCar', )
        }
        //const vehicules = await Vehicules.findAll({})
        res.end() 
        // res.render('dashboard/vehicules.ejs', {
        //     title: "Ajouter un véhicule",
        //     message: "Véhicule ajouté !",
        //     vehicules: vehicules
        // })
    }else{
        res.render('dashboard/createCar.ejs', {
            title: "Ajouter un véhicule",
            message: "Cet immatriculation existe déjà !"
        })
    }

}

controller.entites = async (req, res) => {
    await Entites.sync()
    const entites = await Entites.findAll({})

    res.render('dashboard/entites.ejs', {
        title: "Liste des entités",
        entites: entites
    })
}

controller.viewCreateEntity = async (req, res) => {
    res.render('dashboard/createEntity.ejs', {
        title: "Créer une entité"
    })
}

controller.createEntity = async (req, res) => {
    
    var entite = await Entites.findOne({ nom: req.body.nom})
    
    if(!entite){
        try{
            const entite = await Entites.create({
                nom : req.body.nom,
                type : req.body.type
            });

        } catch (error) {
            console.log(error)
            res.redirect('/createEntity', )
        }
        const entites = await Entites.findAll({})
        res.render('dashboard/entites.ejs', {
            title: "Ajouter une entité",
            message: "Entité ajoutée !",
            entites: entites
        })
    }else{
        res.render('dashboard/createEntity.ejs', {
            title: "Ajouter une entité",
            message: "Cette entité existe déjà !"
        })
    }

}

controller.fiches = async (req, res) => {
    
    await Fiches.sync()
    const fiches = await Fiches.findAll({})

    res.render('dashboard/fiches.ejs', {
        title: "Liste des fiches",
        fiches: fiches
    })
}

controller.viewCreateFiche = async (req, res) => {
    const entites = await Entites.findAll({})
    const vehicules = await Vehicules.findAll({})
    const objets = await Objet.findAll({})

    res.render('dashboard/createFiche.ejs', {
        title: "Créer une fiches",
        entites: entites,
        vehicules: vehicules,
        objets: objets
    })
}

controller.createFiche = async (req, res) => {
    const entites = await Entites.findAll({})
    const vehicules = await Vehicules.findAll({})
    const objets = await Objet.findAll({})

    const fiche = await Fiches.create({
        compteurDepart : req.body.compteurD,
        compteurArrivee : req.body.compteurA,
        date : req.body.date,
        lieuDepart : req.body.lieuD,
        lieuArrivee : req.body.lieuA,
        commentaire : req.body.commentaire,
        IndividuId: req.body.individus,
        VehiculeId: req.body.vehicule,
        EntiteId: req.body.entite,
        ObjetId: req.body.objet
    });

    const fiches = await Fiches.findAll({})
    res.render('dashboard/createFiche.ejs', {
        title: "Créer une fiches",
        entites: entites,
        vehicules: vehicules,
        objets: objets
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

controller.objet = async (req, res) => {
    await Objet.sync()
    const objets = await Objet.findAll({})

    res.render('dashboard/objet.ejs', {
        title: "Liste des objets",
        objets: objets
    })
}

controller.createObjet = async (req, res) => {
    //await Objet.sync()

    var objet = await Objet.findOne({ where: { nom: req.body.nom} })
    
    if(!objet){
        try{
            const objett = await Objet.create({
                nom : req.body.nom
            });

        } catch (error) {
            console.log(error)
            res.redirect('/objet', )
        }
        const objets = await Objet.findAll({})
        res.render('dashboard/objet.ejs', {
            title: "Liste des objets",
            message: "Objet ajouté !",
            objets: objets
        })
    }else{
        const objets = await Objet.findAll({})
        res.render('dashboard/objet.ejs', {
            title: "Liste des objets",
            message: "Cet objet existe déjà !",
            objets: objets
        })
    }

}


controller.afficherFiche = async (req, res) => {
    const fiche = await Fiches.findOne({ id: req.body.id, include: [{model : Entites}, {model : Vehicules}, {model : Objet}, {model : Individus}]})
    const fiches = await Fiches.findAll({ where: {
        vehiculeId: fiche.Vehicule.id
      }, include: [{model : Entites}, {model : Vehicules}, {model : Objet}, {model : Individus}]})


    res.render('dashboard/fiche.ejs', {
        title: "Fiche",
        fiche: fiche,
        fiches: fiches
    })
}


controller.genererPdf = async (req, res) => {
    console.log(req.body.fiche)
}

module.exports = controller;