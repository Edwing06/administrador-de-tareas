//Import sequelize library 
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize ('pruebas_tareas', 'root', '', { 
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize; 
