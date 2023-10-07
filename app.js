const Sequelize = require('./utils/database')
const Usuario = require('./controllers/usuarioController');



Usuario.addUserPromise('Kevin', 'kevinn_97@hotmail.com', 'contrasenia');
//Usuario.getUsers();
//Usuario.getUserById(5);
//Usuario.getUserByUsername('Daniel');
//Usuario.getUserByEmail('Rios');
//Usuario.getUsersBetweenDates('2023-10-02', '2023-10-04');
//Usuario.deleteUserById(3);
//Usuario.deleteUserByEmail('contrasenia');
//Usuario.updateUserName(1, 'Pruebitita');
//Usuario.updateUserEmail(1, 'Pruebita@gmail.com');