const express = require('express');
const config = require('./config');

// Routes
const asistentes = require('./modules/asistentes/routes');

const app = express();

// Configuration
app.set('port', config.app.port);

// Routes
app.use('/api/asistentes', asistentes)

module.exports = app;