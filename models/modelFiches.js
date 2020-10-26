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
    }
}, { timestamps: true });

Individus.hasMany(Fiches);
Fiches.belongsTo(Individus);

Entites.hasMany(Fiches);
Fiches.belongsTo(Entites);

Objet.hasMany(Fiches);
Fiches.belongsTo(Objet);

Vehicules.hasMany(Fiches);
Fiches.belongsTo(Vehicules);

module.exports = Fiches;