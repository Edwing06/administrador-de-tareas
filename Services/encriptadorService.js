const bcrypt = require('bcrypt');

class EncriptadorService {
  static async encriptarContraseña(contraseña) {
    const rondas = 10;
    const contraseñaEncriptada = await bcrypt.hash(contraseña, rondas);
    return contraseñaEncriptada;
  }
}

module.exports = EncriptadorService;
