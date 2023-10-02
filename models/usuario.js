const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//User Model 

const Usuario = sequelize.define('usuarios', {
    //columna 1 (id)
    id: {
        type: Sequelize.INTEGER,
        allownull: false, 
        primaryKey: true
    },
    //Columna 2 (nombre de usuario)
    nombre_usuario: {
        type: Sequelize.STRING,
        allownull: false
    },
    //Columna 3 (correo)
    correo: {
        type: Sequelize.STRING,
        allownull: false
    },
    //Columna 4 (contrasena)
    contrasena: {
        type: Sequelize.STRING,
        allownull: false,
    }

})

module.exports = Usuario; 