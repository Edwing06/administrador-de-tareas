const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//User Model 

const Tarea = sequelize.define('tareas', {
    //columna 1 (id de la tarea)
    id: {
        type: Sequelize.INTEGER,
        allownull: false,
        autoIncrement: true, 
        primaryKey: true
    },
    //Columna 3 (nombre de la tarea)
    nombre: {
        type: Sequelize.STRING,
        allownull: false
    },
    //Columna 4 (descripción de la tarea)
    descripcion: {
        type: Sequelize.STRING,
        allownull: false,
    },
    // Columna 5 (fecha de entrega de la tarea)
    fecha_entrega: {
        type: Sequelize.DATEONLY,
        allownull: false
    },
    // Columna 6 (Estado de la tarea, entregada: false, true)
    entregada: {
        type: Sequelize.BOOLEAN,
        allownull: false
    }

},{
    timestamps: false,
});

module.exports = Tarea;