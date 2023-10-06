const Sequelize = require('sequelize').Sequelize;
const EncriptadorService = require('../Services/encriptadorService');

const User = require('../models/usuario');
 
///Metodo para agregar un usuario a la base de datos con encriptación de contraseña
exports.addUserPromise = async (id, nombre_usuario, correo, contrasena) => {
   try {
     const contraseñaEncriptada = await EncriptadorService.encriptarContraseña(contrasena);

     const nuevoUsuario = await User.create({
       id: id,
       nombre_usuario: nombre_usuario,
       correo: correo,
       contrasena: contraseñaEncriptada, 
     });
     
     console.log(nuevoUsuario);
   } catch (error) {
     console.log(error);
   }
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