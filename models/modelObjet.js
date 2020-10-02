const { Sequelize, DataTypes} = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

const Objet = sequelize.define('Objet', {
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
    }
}, { timestamps: true });

module.exports = Objet;