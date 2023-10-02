const Sequelize = require('sequelize').Sequelize;

const User = require('../models/usuario')
 
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