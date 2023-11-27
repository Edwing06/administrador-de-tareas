
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
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, 'secreto');
    const userId = decodedToken.id;
    
    const nombreTabla = `tareasUsuario_${userId}`;
    
    // Consulta SQL directa para insertar la nueva tarea en la tabla dinámica
    const resultado = await sequelize.query(
      `INSERT INTO ${nombreTabla} (nombre, descripcion, fecha_entrega, entregada) VALUES (?, ?, ?, ?)`,
      {
        replacements: [nombre, descripcion, fecha_entrega, entregada],
        type: sequelize.QueryTypes.INSERT
      }
    );

    // Si se ha insertado correctamente, se devuelve el ID de la nueva tarea
    const nuevaTareaId = resultado[0];

    res.status(201).json({ message: 'Tarea creada exitosamente' });
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
  const { nombre, descripcion, fecha_entrega, entregada, id } = req.body;

  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, 'secreto');
    const userId = decodedToken.id;
    
    const nombreTabla = `tareasUsuario_${userId}`;

    // Consulta SQL directa para actualizar la tarea en la tabla dinámica
    const resultado = await sequelize.query(
      `UPDATE ${nombreTabla} SET nombre = ?, descripcion = ?, fecha_entrega = ?, entregada = ? WHERE id = ?`,
      {
        replacements: [nombre, descripcion, fecha_entrega, entregada, id],
        type: sequelize.QueryTypes.UPDATE
      }
    );

    // Verificar si la tarea se actualizó correctamente
    const filasActualizadas = resultado[1];

    if (filasActualizadas > 0) {
      res.status(200).json({ message: 'Tarea actualizada correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró la tarea para actualizar' });
    }
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
