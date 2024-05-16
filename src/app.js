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

// Cors
// const cors = (req, res, next) => {
//   const origin = "*"; // <-- change this in production
//   res.setHeader("Access-Control-Allow-Origin", origin);
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// };
// app.use(cors);
app.use(corsMiddleware);

// Se usa para reconocer el objeto de solicitud entrante como un objeto JSON.
app.use(express.json());

// Se usa para reconocer el objeto de solicitud entrante como cadenas o matrices.
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static('public'));

// Configuration
app.set('port', config.app.port);

// Routes
app.use('/api/asistentes', asistentes);
app.use('/api/presentacion', presentacion);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

module.exports = app;