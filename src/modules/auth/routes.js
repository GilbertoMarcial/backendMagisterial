// USERS VIEWS
// Se importa express para poder usar el router
const express = require('express');

// Se importan las responses para poder usar la estructura de la respuesta
const response = require('../../network/responses');

// Se importa el index que es el constructor donde se inyecta la base de datos
const controller = require('./index');

// Se importa security para validar a través de Token
const security = require('./security');

// Se importa el router de express para poder definir las rutas de la aplicación.
const router = express.Router();

// Rutas de la aplicación
router.post('/', login);
router.patch('/update', security(), updatePassword);

// Funciones
async function login (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const token = await controller.login(username, password);
    response.success(req, res, token, 200);
  } catch (error) {
    next(error);
  }
}

async function updatePassword (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const new_password = req.body.new_password;

    await controller.updatePassword(username, password, new_password);
    response.success(req, res, 'Contraseña actualizada correctamente', 200);
  } catch (error) {
    next(error);
  }
}

// Exportamos el router para poder usar rutas en app.js
module.exports = router;
