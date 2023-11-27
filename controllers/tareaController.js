
const CustomError = require('../services/customError'); // Importa la clase CustomError
const Tarea = require('../models/tarea'); // Ruta del modelo de tarea
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// Controlador para obtener todas las tareas
exports.listar = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, 'secreto');
    const userId = decodedToken.id;
    
    const nombreTabla = `tareasUsuario_${userId}`;
    
    // Consulta SQL directa
    const tareas = await sequelize.query(`SELECT * FROM ${nombreTabla}`, { type: sequelize.QueryTypes.SELECT });

    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    const customError = new CustomError('Error al obtener las tareas', 500);
    res.status(customError.statusCode).json({ error: customError.message });
  }
};

// Controlador para crear una nueva tarea
exports.crear = async (req, res) => {
  const { nombre, descripcion, fecha_entrega, entregada } = req.body;

  try {
    const nuevaTarea = await Tarea.create({ nombre, descripcion, fecha_entrega, entregada });
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    const customError = new CustomError('Error al crear la tarea', 500);
    res.status(customError.statusCode).json({ error: customError.message });
  }
};

// Controlador para obtener una tarea por su ID
exports.obtenerPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      const customError = new CustomError('Tarea no encontrada', 404);
      return res.status(customError.statusCode).json({ error: customError.message });
    }
    res.json(tarea);
  } catch (error) {
    console.error('Error al obtener la tarea por ID:', error);
    const customError = new CustomError('Error al obtener la tarea por ID', 500);
    res.status(customError.statusCode).json({ error: customError.message });
  }
};

// Controlador para actualizar una tarea por su ID
exports.actualizarPorId = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha_entrega, entregada } = req.body;

  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      const customError = new CustomError('Tarea no encontrada', 404);
      return res.status(customError.statusCode).json({ error: customError.message });
    }

    tarea.nombre = nombre;
    tarea.descripcion = descripcion;
    tarea.fecha_entrega = fecha_entrega;
    tarea.entregada = entregada;

    await tarea.save();

    res.json(tarea);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    const customError = new CustomError('Error al actualizar la tarea', 500);
    res.status(customError.statusCode).json({ error: customError.message });
  }
};

// Controlador para eliminar una tarea por su ID
exports.eliminarPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      const customError = new CustomError('Tarea no encontrada', 404);
      return res.status(customError.statusCode).json({ error: customError.message });
    }

    await tarea.destroy();

    res.json({ mensaje: 'Tarea eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    const customError = new CustomError('Error al eliminar la tarea', 500);
    res.status(customError.statusCode).json({ error: customError.message });
  }
};
