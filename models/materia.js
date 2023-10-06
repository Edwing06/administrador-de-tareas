const Sequelize = require('sequelize');
const sequelize = require('..utils/database');

//Tabla materia

const Materia = sequelize.define('materias', {
    //columna 1, llave primaria
    id: {
        type: Sequelize.INTEGER,
        allownull: false,
        primaryKey: true
    },

    //columna 2, nombre de la materia
    nombre_materia: {
        type: Sequelize.STRING,
        allownull: false
    }
})

module.exports = Materia;
