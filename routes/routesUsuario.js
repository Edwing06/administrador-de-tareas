const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.listar);
router.post('/usuarios', usuarioController.crear);
router.get('/usuarios/:id', usuarioController.obtenerPorId);
router.put('/usuarios/:id', usuarioController.actualizarPorId);
router.delete('/usuarios/:id', usuarioController.eliminarPorId);

module.exports = router;