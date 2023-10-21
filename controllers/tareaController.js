const Tarea = require('../models/tarea'); // Importa el modelo de la tarea


// Controlador para obtener todas las tareas
exports.listar = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener una tarea por su ID
exports.obtenerPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    console.error('Error al obtener la tarea por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar una tarea por su ID
exports.actualizarPorId = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha_entrega, entregada } = req.body;

  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tarea.nombre = nombre;
    tarea.descripcion = descripcion;
    tarea.fecha_entrega = fecha_entrega;
    tarea.entregada = entregada;

    await tarea.save();

    res.json(tarea);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar una tarea por su ID
exports.eliminarPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await usuario.destroy();

    res.json({ mensaje: 'Tarea eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
