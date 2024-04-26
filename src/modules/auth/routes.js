// USERS VIEWS
// Se importa express para poder usar el router
const express = require('express');

// Se importan las responses para poder usar la estructura de la respuesta
const response = require('../../network/responses');

// Se importa el index que es el constructor donde se inyecta la base de datos
const controller = require('./index');

// Se importa el router de express para poder definir las rutas de la aplicación.
const router = express.Router();

// Rutas de la aplicación

// Funciones

// Exportamos el router para poder usar rutas en app.js
module.exports = router;
