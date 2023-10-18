const Usuario = require('../models/usuario'); // Importa el modelo de usuario
const bcrypt = require('bcrypt');

// Controlador para obtener todos los usuarios
exports.listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll(); // Obtiene todos los usuarios de la base de datos
    res.json(usuarios); // Responde con los usuarios en formato JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' }); // Maneja y responde con un error 500 en caso de problemas
  }
};

// Controlador para crear un nuevo usuario
exports.crear = async (req, res) => {
  const { nombre_usuario, correo, contrasena } = req.body;

  try {
    const nuevoUsuario = await Usuario.create({ nombre_usuario, correo, contrasena }); // Crea un nuevo usuario en la base de datos
    res.status(201).json(nuevoUsuario); // Responde con el nuevo usuario creado y un estado 201 (Creado)
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' }); // Maneja y responde con un error 500 en caso de problemas
  }
};

// Controlador para obtener un usuario por su ID
exports.obtenerPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id); // Busca un usuario por su ID
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' }); // Responde con un error 404 si el usuario no se encuentra
    }
    res.json(usuario); // Responde con los detalles del usuario en formato JSON
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' }); // Maneja y responde con un error 500 en caso de problemas
  }
};

// Controlador para actualizar un usuario por su ID
exports.actualizarPorId = async (req, res) => {
  const { id } = req.params;
  const { nombre_usuario, correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findByPk(id); // Busca un usuario por su ID
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' }); // Responde con un error 404 si el usuario no se encuentra
    }

    usuario.nombre_usuario = nombre_usuario;
    usuario.correo = correo;

    // Encriptación de la contraseña actualizada
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
    usuario.contrasena = hashedPassword;

    await usuario.save(); // Guarda los cambios en el usuario

    res.json(usuario); // Responde con los detalles del usuario actualizado en formato JSON
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' }); // Maneja y responde con un error 500 en caso de problemas
  }
};

// Controlador para eliminar un usuario por su ID
exports.eliminarPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id); // Busca un usuario por su ID
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' }); // Responde con un error 404 si el usuario no se encuentra
    }

    await usuario.destroy(); // Elimina el usuario de la base de datos

    res.json({ mensaje: 'Usuario eliminado con éxito' }); // Responde con un mensaje de éxito en formato JSON
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' }); // Maneja y responde con un error 500 en caso de problemas
  }
};