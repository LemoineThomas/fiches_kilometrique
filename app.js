var app = {};
 
function start(callback) {
    init(function() {
        /* On démarre le routeur défini juste avant */
        app.router.start(function() {
            if(typeof callback != 'undefined') {
                callback();
            }
        });
    });
}
 
function init(callback) {
    const { Sequelize } = require('sequelize');

    // Option 2: Passing parameters separately (sqlite)
    const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
    });

    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    /* On instancie notre module router */
    app.router = require('./routes/router');
 
    if(typeof callback != 'undefined') {
        callback();
    }
}
 
module.exports = {
    start: start
};