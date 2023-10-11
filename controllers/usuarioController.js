<<<<<<< Updated upstream
const Sequelize = require('sequelize').Sequelize;
const User = require('../models/usuario')
const { Op } = require('sequelize');
 
///Metodo para agregar un usuario a la base de datos 
exports.addUserPromise = (id,nombre_usuario,correo,contrasena) => {
     User.create({
        id: id,
        nombre_usuario: nombre_usuario,
        correo: correo,
        contrasena: contrasena 
     })
     .then(result => {
        console.log(result);
     })
     .catch(err => {
        console.log(err);
     })
}

//Metodo para eliminar un usuario por ID
exports.deleteUserById = (userId) => {
   User.destroy({
     where: {
       id: userId
     }
   })
   .then((deletedRowCount) => {
     if (deletedRowCount > 0) {
       console.log(`Usuario con ID ${userId} eliminado correctamente.`);
     } else {
       console.log(`No se encontró ningún usuario con ID - ${userId}. No se realizó ninguna eliminación.`);
     }
   })
   .catch(err => {
     console.log(err);
   });
 };

//Metodo para eliminar un usuario por correo
exports.deleteUserByEmail = (email) => {
   User.destroy({
     where: {
       correo: email
     }
   })
   .then((deletedRowCount) => {
     if (deletedRowCount > 0) {
       console.log(`Usuario con correo electrónico - ${email} - eliminado correctamente.`);
     } else {
       console.log(`No se encontró ningún usuario con el correo electrónico - ${email}. No se realizó ninguna eliminación.`);
     }
   })
   .catch(err => {
     console.log(err);
   });
 };

// Metodo para actualizar el nombre de usuario de un usuario proporcionando el ID y el nuevo nombre del usuario
exports.updateUserName = (userId, newName) => {
   User.update(
     { nombre_usuario: newName },
     {
       where: {
         id: userId
       }
     }
   )
   .then((updatedRowCount) => {
     if (updatedRowCount > 0) {
       console.log(`Nombre del usuario con ID - ${userId} actualizado correctamente.`);
     } else {
       console.log(`No se encontró ningún usuario con el ID ${userId}. No se realizó ninguna actualización.`);
     }
   })
   .catch(err => {
     console.log(err);
   });
 };

//Metodo para actualizar el correo electronico de un usuario proporcionando el ID y el nuevo correo
exports.updateUserEmail = (userId, newEmail) => {
   User.update(
     { correo: newEmail },
     {
       where: {
         id: userId
       }
     }
   )
   .then((updatedRowCount) => {
     if (updatedRowCount > 0) {
       console.log(`Correo electrónico del usuario con ID ${userId} actualizado correctamente.`);
     } else {
       console.log(`No se encontró ningún usuario con el ID ${userId}. No se realizó ninguna actualización.`);
     }
   })
   .catch(err => {
     console.log(err);
   });
 };
  

// Metodo para obtener la lista de los usuarios en la base de datos
exports.getUsers = () => {
   User.findAll()
   .then((result) => {
      console.log(JSON.stringify(result, null, 2))
   })
   .catch(err => {
      console.log(err);
   })
}
// Metodo para obtener el usuario que coincida con el ID dado de la base de datos
exports.getUserById = (id) =>{
   User.findByPk(id)
   .then((result) =>{
      console.log(JSON.stringify(result, null, 2))
   })
   .catch(err => {
      console.log(err);
   })
}
// Metodo para obtener el usuario que coincida con el nombre de usuario dado de la base de datos
exports.getUserByUsername = (nombre_usuario) => {
   User.findOne({
     where: {
       nombre_usuario: nombre_usuario
     }
   })
   .then((result) => {
     console.log(JSON.stringify(result, null, 2));
   })
   .catch(err => {
     console.log(err);
   });
 }
=======
const Usuario = require('../models/usuario'); // Importa el modelo de usuario

// Controlador para obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  const { usuarioname, email, password } = req.body;

  try {
    const nuevoUsuario = await Usuario.create({ usuarioname, email, password });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener un usuario por su ID
exports.getUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar un usuario por su ID
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { usuarioname, email, password } = req.body;
>>>>>>> Stashed changes

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    usuario.usuarioname = usuarioname;
    usuario.email = email;
    usuario.password = password;

    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un usuario por su ID
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.destroy();

    res.json({ mensaje: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
