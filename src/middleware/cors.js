const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  '*',
  'https://www.calpullixalapa.com.mx',
  'http://localhost:4200'
];

// Habilitamos CORS para que la API pueda ser consumida por el frontend
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
