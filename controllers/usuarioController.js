const Sequelize = require('sequelize').Sequelize;
const User = require('../models/usuario')
const TareasUsuario = require('../models/tareasUsuario'); 
const { Op } = require('sequelize');
const EncriptadorService = require('../Services/encriptadorService');
 

exports.addUserPromise = (nombre_usuario, correo, contrasena) => {
  return EncriptadorService.encriptarContraseña(contrasena)
    .then(contraseñaEncriptada => {
      
      return User.create({
        nombre_usuario: nombre_usuario,
        correo: correo,
        contrasena: contraseñaEncriptada, 
      });
    })
    .then(nuevoUsuario => {
      console.log(nuevoUsuario);

      // Una vez que el usuario se ha creado con éxito, obtener su ID
      const userId = nuevoUsuario.id;

      // Crear la tabla de tareas asociada al usuario
      const tableName = `tareasUsuario_${userId}`;
      return TareasUsuario.sync({ tableName: tableName })
        .then(() => {
          console.log(`Tabla de tareas creada con éxito para el usuario ${userId}.`);
        });
    })
    .catch(error => {
      console.log(error);
      throw error; // Propaga el error para que pueda ser manejado en otro lugar
    });
};

//Función para crear una tabla especial para las tareas del usuario
//No se ha implementado todavía
function createTareasTable(id) {
  const tableName = `tareasUsuario_${id}`; // Nombre de la tabla dinámica

  return TareaUsuario.sync({ tableName: tableName })
    .then(() => {
      console.log(`Tabla de tareas creada con éxito para el usuario ${id}.`);
    })
    .catch((err) => {
      console.log(err);
      throw err; // Propaga el error para que pueda ser manejado en otro lugar
    });
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