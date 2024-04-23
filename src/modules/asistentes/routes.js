// ASISTENTES VIEWS
// Se importa express para poder usar el router
const express = require('express');

// Se importa el router de express para poder definir las rutas de la aplicación.
const router = express.Router();

// Ruta para obtener todos los registros de la tabla asistentes
router.get('/', (req, res) => {
    res.send('Asistentes OK');
});

// Exportamos el router para poder usar rutas en app.js
module.exports = router;
