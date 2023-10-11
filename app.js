const ExpressApp = require('./expressApp'); // Importa la clase ExpressApp definida en expressApp.js

const app = new ExpressApp();
const port = process.env.PORT || 3000; // Define el puerto en el que deseas que tu aplicación se ejecute

app.start(port); // Inicia el servidor Express