const { Sequelize, DataTypes} = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory');
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

module.exports = Fiches;