const { Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');


const Individus = sequelize.define('Individus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fonction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mdp: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

module.exports = Individus;