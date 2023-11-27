
const CustomError = require('../services/customError'); // Importa la clase CustomError
const Tarea = require('../models/tarea'); // Reemplaza la ruta por la ubicación real de tu modelo Tarea
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// Controlador para obtener todas las tareas
exports.listar = async (req, res) => {
  try {
    const token = req.cookies.token; // Obtenemos el JWT token que almacenamos en las cookies
    const decodedToken = jwt.verify(token, 'secreto'); // Decodificamos el token para obtener la información almacenada
    const userId = decodedToken.id; // Obtenemos el id del usuario almacenado en las cookies ya decodificadas

    const nombreTabla = `tareasUsuario_${userId}`; // Construimos el nombre de la tabla dinámicamente

    // Utilizamos el modelo Tarea existente para acceder a la tabla dinámica
    const TareaDinamica = Tarea.sequelize.define(nombreTabla, {
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
        type: Sequelize.DATE,
        allownull: false
      },
      // Columna 6 (Estado de la tarea, entregada: false, true)
      entregada: {
        type: Sequelize.BOOLEAN,
        allownull: false
      }
    }, {
      tableName: nombreTabla, // Establece el nombre de la tabla dinámica
      timestamps: false, // Opcional: deshabilita los campos de timestamp si no son necesarios
    });

    const tareas = await TareaDinamica.findAll();

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
