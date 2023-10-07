const Sequelize = require('sequelize').Sequelize;
const User = require('../models/usuario')
const { Op } = require('sequelize');
const EncriptadorService = require('../Services/encriptadorService');
 
///Metodo para agregar un usuario a la base de datos 
exports.addUserPromise = (id, nombre_usuario, correo, contrasena) => {
  return EncriptadorService.encriptarContraseña(contrasena)
    .then(contraseñaEncriptada => {
      return User.create({
        id: id,
        nombre_usuario: nombre_usuario,
        correo: correo,
        contrasena: contraseñaEncriptada, 
      });
    })
    .then(nuevoUsuario => {
      console.log(nuevoUsuario);
    })
    .catch(error => {
      console.log(error);
    });
};


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

 //Método para actualizar el usuario
 exports.updateUser = (userId, newName, newPassword) => {
  return EncriptadorService.encriptarContraseña(newPassword)
    .then(contraseñaEncriptada => {
      return User.update(
        {
          nombre_usuario: newName,
          contrasena: contraseñaEncriptada
        },
        {
          where: {
            id: userId
          }
        }
      );
    })
    .then(([updatedRowCount]) => {
      if (updatedRowCount > 0) {
        console.log(`Nombre de usuario y contraseña del usuario con ID - ${userId} actualizados correctamente.`);
      } else {
        console.log(`No se encontró ningún usuario con el ID ${userId}. No se realizó ninguna actualización.`);
      }
    })
    .catch(error => {
      console.log(error);
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

 // Metodo para obtener el usuario que coincida con el correo dado de la base de datos
 exports.getUserByEmail = (correo) => {
   User.findOne({
     where: {
       correo: correo
     }
   })
   .then((result) => {
     console.log(JSON.stringify(result, null, 2));
   })
   .catch(err => {
     console.log(err);
   });
 }

// Metodo para obtener la lista de usuarios creados dentro del periodo dado
 exports.getUsersBetweenDates = (startDate, endDate) => {
   User.findAll({
     where: {
       createdAt: {
         [Op.between]: [startDate, endDate]
       }
     }
   })
   .then((results) => {
     console.log(JSON.stringify(results, null, 2));
   })
   .catch(err => {
     console.log(err);
   });
 };