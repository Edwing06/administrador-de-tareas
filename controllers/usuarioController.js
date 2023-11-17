const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const CustomError = require('../services/customError') // Importa la clase CustomError
const errorHandler = require('../services/errors') // Importa el middleware errorHandler
const Tarea = require('../models/tarea');
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const jwt = require('jsonwebtoken');

// Controlador para el login de usuarios
exports.login = async (req, res, next) => {
  const { correo, contrasena } = req.body;

  try {
    // Buscar al usuario por correo
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      throw new CustomError('Credenciales inválidas', 401);
    }

    // Verificar la contraseña ingresada con la contraseña almacenada en la base de datos
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!contrasenaValida) {
      throw new CustomError('Credenciales inválidas', 401);
    }

    // Si las credenciales son válidas, crear un token JWT
    const token = jwt.sign({ id: usuario.id }, 'secreto', { expiresIn: '1h' });

    // Configuración de la cookie para almacenar el token
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 'maxAge' es el tiempo de vida de la cookie en milisegundos (aquí configurado para una hora)

    // Enviar el token como respuesta
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

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
    const nuevoUsuario = await Usuario.create({ nombre_usuario, correo, contrasena });

    //Generamos el nombre de la tabla. Se usan esas comillas para que lo que se encuentra dentro de las llaves sea tomado como una variable y no como un texto.
    const nombreTablaDeTareas = `tareasUsuario_${nuevoUsuario.id}`;

    const TareasUsuario = Tarea.init(
      {
        id_tarea: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        nombre: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        descripcion: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        fecha_entrega: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        entregada: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      }, {
      timestamps: false,
      sequelize, // Debes pasar la instancia de Sequelize
      tableName: nombreTablaDeTareas, // Establece el nombre de la tabla dinámica
    }
    );

    // Sincroniza el modelo con la base de datos para crear la tabla
    await TareasUsuario.sync();

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
