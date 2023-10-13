const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

router.get('/tareas', tareasController.getTareas);
router.post('/tareas', tareasController.crearTarea);
router.get('/tareas/:id', tareasController.getTareasPorId);
router.put('/tareas/:id', tareasController.actualizarTarea);
router.delete('/tareas/:id', tareasController.eliminarTarea);

module.exports = router;