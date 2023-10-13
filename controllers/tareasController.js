const Tareas = require('../models/tarea'); // Importa el modelo de la tarea


// Controlador para obtener todas las tareas
exports.listar = async (req, res) => {
  try {
    const tareas = await Tareas.findAll();
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear una nueva tarea
exports.crear = async (req, res) => {

};

// Controlador para obtener una tarea por su ID
exports.obtenerPorId = async (req, res) => {

};

// Controlador para actualizar una tarea por su ID
exports.actualizarPorId = async (req, res) => {

};

// Controlador para eliminar una tarea por su ID
exports.eliminarPorId = async (req, res) => {

};
