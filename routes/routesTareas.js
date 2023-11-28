const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareaController');

router.get('/tareas', tareasController.listar);
router.post('/tareas', tareasController.crear);
router.get('/tareas/:id', tareasController.obtenerPorId);
router.put('/tareas/editar', tareasController.actualizarPorId);
router.delete('/tareas/:id', tareasController.eliminarPorId);

module.exports = router;