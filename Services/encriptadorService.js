const bcrypt = require('bcrypt'); // Importa la biblioteca 'bcrypt'.

class EncriptadorService {
  static encriptarContraseña(contraseña) {
    const rondas = 10; // Define el número de rondas para el hash (fijo en 10).

    return new Promise((resolve, reject) => { // Crea y devuelve una promesa.
      bcrypt.hash(contraseña, rondas, (err, contraseñaEncriptada) => { // Utiliza bcrypt para encriptar la contraseña.
        if (err) {
          reject(err); // Rechaza la promesa si ocurre un error durante la encriptación.
        } else {
          resolve(contraseñaEncriptada); // Resuelve la promesa con la contraseña encriptada si tiene éxito.
        }
      });
    });
  }
}

module.exports = EncriptadorService; // Exporta la clase EncriptadorService para su uso en otros módulos.
