//Import sequelize library 
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize ('pruebas_tareas', 'root', '1234', { 
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

module.exports = sequelize; 
