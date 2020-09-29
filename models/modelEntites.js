const { Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');


const Entite = sequelize.define('Entite', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { timestamps: true });

module.exports = Entite;