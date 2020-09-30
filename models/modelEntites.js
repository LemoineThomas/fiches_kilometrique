const { Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');


const Entites = sequelize.define('Entites', {
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
        allowNull: false
    }
}, { timestamps: true });

module.exports = Entites;