const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const CustomError = require('../services/customError') // Importa la clase CustomError
const errorHandler = require('../services/error') // Importa el middleware errorHandler

// Controlador para obtener todos los usuarios
exports.listar = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll()
    res.json(usuarios)
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    const customError = new CustomError('Error al obtener usuarios', 500)
    next(customError) // Manejo del error con el middleware errorHandler
  }
}

// Controlador para crear un nuevo usuario
exports.crear = async (req, res, next) => {
  const { nombre_usuario, correo, contrasena } = req.body

  try {
    const nuevoUsuario = await Usuario.create({
      nombre_usuario,
      correo,
      contrasena
    })
    res.status(201).json(nuevoUsuario)
  } catch (error) {
    console.error('Error al crear usuario:', error)
    const customError = new CustomError('Error al crear usuario', 500)
    next(customError) // Manejo del error con el middleware errorHandler
  }
}

// Controlador para obtener un usuario por su ID
exports.obtenerPorId = async (req, res, next) => {
  const { id } = req.params

  try {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      const customError = new CustomError('Usuario no encontrado', 404)
      next(customError) // Manejo del error con el middleware errorHandler
      return
    }
    res.json(usuario)
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error)
    const customError = new CustomError('Error al obtener usuario por ID', 500)
    next(customError) // Manejo del error con el middleware errorHandler
  }
}

// Controlador para actualizar un usuario por su ID
exports.actualizarPorId = async (req, res, next) => {
  const { id } = req.params
  const { nombre_usuario, correo, contrasena } = req.body

  try {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      const customError = new CustomError('Usuario no encontrado', 404)
      next(customError) // Manejo del error con el middleware errorHandler
      return
    }

    usuario.nombre_usuario = nombre_usuario
    usuario.correo = correo

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds)
    usuario.contrasena = hashedPassword

    await usuario.save()
    res.json(usuario)
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    const customError = new CustomError('Error al actualizar usuario', 500)
    next(customError) // Manejo del error con el middleware errorHandler
  }
}

// Controlador para eliminar un usuario por su ID
exports.eliminarPorId = async (req, res, next) => {
  const { id } = req.params

  try {
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      const customError = new CustomError('Usuario no encontrado', 404)
      next(customError) // Manejo del error con el middleware errorHandler
      return
    }

    await usuario.destroy()
    res.json({ mensaje: 'Usuario eliminado con éxito' })
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    const customError = new CustomError('Error al eliminar usuario', 500)
    next(customError) // Manejo del error con el middleware errorHandler
  }
}
