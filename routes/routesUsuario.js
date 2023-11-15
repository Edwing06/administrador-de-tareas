const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const path = require('path');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const session = require('express-session');

router.use(session({
    secret: 'secret', 
    resave: true,
    saveUninitialized: true
  }));

router.get('/', (req, res) => {
  const loginFilePath = path.join(__dirname, '../static/login.html');
  res.sendFile(loginFilePath);
});

router.post('/auth', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      // Verifica si se proporcionaron tanto el nombre de usuario como la contraseña
      return res.status(400).send('<script>alert("Por favor, ingrese tanto el usuario como la contraseña."); window.history.back();</script>');
    }

    const usuario = await Usuario.findOne({ where: { nombre_usuario: username } });

    if (!usuario) {
      return res.status(401).send('<script>alert("Contraseña o usuario incorrecto. Intente nuevamente."); window.history.back();</script>');
    }

    const contrasenaValida = await bcrypt.compare(password, usuario.contrasena);

    if (contrasenaValida) {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect('/index'); // Ajusta la ruta según la ubicación real de tus archivos estáticos
    } else {
      res.status(401).send('<script>alert("Contraseña o usuario incorrecto. Intente nuevamente."); window.history.back();</script>');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('<script>alert("Ha ocurrido un error. Intente nuevamente más tarde."); window.history.back();</script>');
  }
});

router.get('/index', (req, res) => {
    const loginFilePath = path.join(__dirname, '../static/index.html');
    res.sendFile(loginFilePath);
  });

  router.get('/styles/index.css', (req, res) => {
    const cssFilePath = path.join(__dirname, '../static/styles/index.css');
    res.sendFile(cssFilePath);
});

router.get('/index.js', (req, res) => {
  const cssFilePath = path.join(__dirname, '../static/index.js');
  res.sendFile(cssFilePath);
});



router.get('/usuarios', usuarioController.listar);
router.post('/usuarios', usuarioController.crear);
router.get('/usuarios/:id', usuarioController.obtenerPorId);
router.put('/usuarios/:id', usuarioController.actualizarPorId);
router.delete('/usuarios/:id', usuarioController.eliminarPorId);

module.exports = router;