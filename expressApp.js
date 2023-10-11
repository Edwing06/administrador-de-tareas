const express = require('express');
const bodyParser = require('body-parser'); // Middleware para el análisis de solicitudes
const routes = require('./routes/routes'); // Tus rutas definidas

class ExpressApp {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(bodyParser.json()); // Middleware para analizar solicitudes JSON
    this.app.use(bodyParser.urlencoded({ extended: false })); // Middleware para analizar solicitudes de formularios
  }

  setupRoutes() {
    this.app.use('/api', routes); // Monta tus rutas en '/api' (puedes personalizar el prefijo)
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Servidor Express escuchando en el puerto ${port}`);
    });
  }
}

module.exports = ExpressApp;






