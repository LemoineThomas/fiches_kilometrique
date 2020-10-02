const { Sequelize, DataTypes} = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory');
const Individus = require('./modelIndividus');
const Vehicules = require('./modelVehicules');
const Entites = require('./modelEntites');
const Objet = require('./modelObjet');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

const Fiches = sequelize.define('Fiches', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    compteurDepart: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    compteurArrivee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lieuDepart: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lieuArrivee: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commentaire: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_individus: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
            model: Individus,
            key:'id'
        }
    },
    id_vehicule: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
            model: Vehicules,
            key:'id'
        }
    },
    id_entite: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
            model: Entites,
            key:'id'
        }
    }
    ,
    id_objet: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
            model: Objet,
            key:'id'
        }
    }
}, { timestamps: true });

module.exports = Fiches;