const express = require('express');
const config = require('./config');
const error = require('./network/errors');

// Routes
const asistentes = require('./modules/asistentes/routes');

const app = express();

// Se usa para reconocer el objeto de solicitud entrante como un objeto JSON.
app.use(express.json());

// Se usa para reconocer el objeto de solicitud entrante como cadenas o matrices.
app.use(express.urlencoded({ extended: true }));

// Configuration
app.set('port', config.app.port);

// Routes
app.use('/api/asistentes', asistentes)

app.use(error);

module.exports = app;