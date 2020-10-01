const { Sequelize, DataTypes} = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

const Vehicules = sequelize.define('Vehicules', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    marque: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modele: {
        type: DataTypes.STRING,
        allowNull: false
    },
    puissance: {
        type: DataTypes.STRING,
        allowNull: false
    },
    annee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    immatriculation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { timestamps: true });

module.exports = Vehicules;