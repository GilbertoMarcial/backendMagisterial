const express = require('express');
const config = require('./config');
// const cors = require('cors');
const corsMiddleware = require('./middleware/cors');
const error = require('./network/errors');

// Routes
const asistentes = require('./modules/asistentes/routes');
const users = require('./modules/users/routes');
const auth = require('./modules/auth/routes');
const presentacion = require('./modules/presentacion/routes');

const app = express();

// Se usa para reconocer el objeto de solicitud entrante como un objeto JSON.
app.use(express.json());

// Se usa para reconocer el objeto de solicitud entrante como cadenas o matrices.
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(corsMiddleware);

// Configuration
app.set('port', config.app.port);

// Routes
app.use('/api/asistentes', asistentes);
app.use('/api/presentacion', presentacion);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

module.exports = app;