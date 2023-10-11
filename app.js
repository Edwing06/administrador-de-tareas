const ExpressApp = require('./expressApp'); // Importa la clase ExpressApp definida en expressApp.js

const app = new ExpressApp();
const port = process.env.PORT || 3000; // Define el puerto en el que deseas que tu aplicación se ejecute

<<<<<<< Updated upstream

//Usuario.addUserPromise(0,'Kevin', 'kevinn_97@hotmail.com', 'contrasenia');
//Usuario.getUsers();
//Usuario.getUserById(5);
//Usuario.getUserByUsername('Daniel');
//Usuario.getUserByEmail('Rios');
//Usuario.getUsersBetweenDates('2023-10-02', '2023-10-04');
//Usuario.deleteUserById(3);
//Usuario.deleteUserByEmail('contrasenia');
//Usuario.updateUserName(1, 'Pruebitita');
//Usuario.updateUserEmail(1, 'Pruebita@gmail.com');
=======
app.start(port); // Inicia el servidor Express
>>>>>>> Stashed changes
