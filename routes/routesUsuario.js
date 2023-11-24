const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const path = require('path');


// Redirige la ruta raíz a la página de inicio de sesión
router.get('/', (req, res) => {
    const loginFilePath = path.join(__dirname, '../static/login.html');
    res.sendFile(loginFilePath);
  });

  // Obtiene los recursos de la ruta /styles/login.css para aplicarlos los estilos en la login.html
  router.get('/styles/login.css', (req, res) => {
    const cssFilePath = path.join(__dirname, '../static/styles/login.css');
    res.sendFile(cssFilePath);
});

// Autentica los datos ingresados por el usuario
router.post('/autenticar', usuarioController.login);


router.post('/registrar', usuarioController.crear);


// Redirige la ruta raíz a la página de inicio de sesión
router.get('/index', (req, res) => {
    const loginFilePath = path.join(__dirname, '../static/index.html');
    res.sendFile(loginFilePath);
  });



// Obtiene los recursos de la ruta /styles/index.css para aplicarlos los estilos en la index.html
  router.get('/styles/index.css', (req, res) => {
    const cssFilePath = path.join(__dirname, '../static/styles/index.css');
    res.sendFile(cssFilePath);
});
// Obtiene los recursos de la ruta /index.js' para aplicar el script en la index.html
router.get('/index.js', (req, res) => {
  const cssFilePath = path.join(__dirname, '../static/index.js');
  res.sendFile(cssFilePath);
});

// Obtiene los recursos de la ruta /modal.js' para aplicar el script en la login.html
router.get('/modal.js', (req, res) => {
  const cssFilePath = path.join(__dirname, '../static/modal.js');
  res.sendFile(cssFilePath);
});



router.get('/usuarios', usuarioController.listar);
router.post('/usuarios', usuarioController.crear);
router.get('/usuarios/:id', usuarioController.obtenerPorId);
router.put('/usuarios/:id', usuarioController.actualizarPorId);
router.delete('/usuarios/:id', usuarioController.eliminarPorId);

module.exports = router;