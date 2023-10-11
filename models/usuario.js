const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const bcrypt = require('bcrypt');

// Se define el modelo de la entidad usuario
const Usuario = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nombre de usuario único'
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Asegura que el correo electrónico sea único
        validate: {
            isEmail: true,
        },
        comment: 'Correo electrónico del usuario'
    },
    contrasena: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Contraseña almacenada con hash'
    }
}, {
    timestamps: false,
}, {
    hooks: {
        beforeCreate: (usuario) => {
            // Hash de la contraseña antes de guardarla en la base de datos
            const saltRounds = 10; // Número de rondas de sal
            return bcrypt.hash(usuario.contrasena, saltRounds)
                .then((hash) => {
                    usuario.contrasena = hash;
                });
        }
    }
});

module.exports = Usuario;