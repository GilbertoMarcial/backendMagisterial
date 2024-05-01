// PRESENTACIÓN VIEWS
// Se importa express para poder usar el router
const express = require('express');

// Se importa security para validar a través de Token
const security = require('./security');

// Se importan las responses para poder usar la estructura de la respuesta
const response = require('../../network/responses');

// Se importa el index que es el constructor donde se inyecta la base de datos
const controller = require('./index');

// Se importa el router de express para poder definir las rutas de la aplicación.
const router = express.Router();

// Rutas de la aplicación
router.get('/:id', security(), getByAsistenteId);

// Función que obtiene los datos de la presentación a través del id del asistente
async function getByAsistenteId (req, res, next) {
  try {
    const item = await controller.getByAsistenteId(req.params.id);
    response.success(req, res, item, 200);
  } catch (error) {
    next(error);
  }
}

// Exporta el router para poder usar rutas en app.js
module.exports = router;
