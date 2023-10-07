const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//User Model 

const Tarea = sequelize.define('tareas', {
    //columna 1 (id de la tarea)
    id_tarea: {
        type: Sequelize.INTEGER,
        allownull: false, 
        primaryKey: true
    },
    //Columna 2 (id del usuario)
    id_usuario: {
        type: Sequelize.INTEGER,
        allownull: false,
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
        type: Sequelize.TIME,
        allownull: false
    },
    // Columna 6 (Estado de la tarea, entregada: false, true)
    entregada: {
        type: Sequelize.BOOLEAN,
        allownull: false
    }

})

module.exports = TareasUsaurio; 