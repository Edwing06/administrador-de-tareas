const bcrypt = require('bcrypt');

class EncriptadorService {
  static encriptarContraseña(contraseña) {
    const rondas = 10;

    return new Promise((resolve, reject) => {
      bcrypt.hash(contraseña, rondas, (err, contraseñaEncriptada) => {
        if (err) {
          reject(err); // En caso de error, rechaza la promesa
        } else {
          resolve(contraseñaEncriptada); // Si tiene éxito, resuelve la promesa con la contraseña encriptada
        }
      });
    });
  }
}

module.exports = EncriptadorService;
