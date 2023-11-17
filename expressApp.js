const express = require('express'); // Importa la biblioteca Express
const bodyParser = require('body-parser'); // Middleware para analizar solicitudes
const cookieParser = require('cookie-parser') // Middleware para manejar las cookies
const routesUsuarios = require('./routes/routesUsuario'); // Importa las rutas definidas para usuarios
const routesTareas = require('./routes/routesTareas'); //Importa las rutas definidas para tareas

class ExpressApp {
  constructor() {
    this.app = express(); // Crea una instancia de la aplicación Express
    this.setupMiddleware(); // Configura el middleware
    this.setupRoutes(); // Configura las rutas
  }

  setupMiddleware() {
    this.app.use(bodyParser.json()); // Utiliza el middleware para analizar solicitudes JSON
    this.app.use(bodyParser.urlencoded({ extended: false })); // Utiliza el middleware para analizar solicitudes de formularios
    this.app.use(cookieParser()); // Utiliza el middleware para el manejo de cookies
  }

  setupRoutes() {
    this.app.use('/usuarios', routesUsuarios); // Agrega las rutas a la aplicación en el prefijo '/usuarios'
    this.app.use('/tareas', routesTareas); //Agrega las rutas a la aplicacion en el prefijo '/tareas'
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Servidor Express escuchando en el puerto ${port}`);
    });
  }
}

module.exports = ExpressApp; // Exporta la clase ExpressApp para su uso en otros módulos







