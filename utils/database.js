//Import sequelize library 
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize ('administrador_de_tareas', 'root', '1234', { 
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize; 
