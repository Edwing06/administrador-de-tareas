const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.getUsuarios);
router.post('/usuarios', usuarioController.crearUsuario);
router.get('/usuarios/:id', usuarioController.getUsuarioPorId);
router.put('/usuarios/:id', usuarioController.actualizarUsuario);
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);

module.exports = router;