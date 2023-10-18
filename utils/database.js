// Importa la biblioteca Sequelize
const { Sequelize } = require('sequelize');

// Crea una instancia de Sequelize y se conecta a la base de datos
const sequelize = new Sequelize('administrador_de_tareas', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

// Verificar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize; // Exporta la instancia de Sequelize para su uso en otros módulos.
