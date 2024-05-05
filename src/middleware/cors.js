const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  '*',
  '127.0.0.1',
  '208.109.67.112', 
  'https://www.calpullixalapa.com.mx',
  'http://localhost:4200'
];

// Habilitamos CORS para que la API pueda ser consumida por el frontend
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);

// BACKUP
// const express = require('express');
// const cors = require('cors');
// const app = express();

// const allowedOrigins = [
//   'https://www.calpullixalapa.com.mx',
//   'http://localhost:4200'
// ];

// // Habilitamos CORS para que la API pueda ser consumida por el frontend
// app.use(cors({
//   origin: allowedOrigins,
//   // origin: 'https://www.calpullixalapa.com.mx/', // URL del frontend
//   // origin: 'http://localhost:4200', // URL del frontend
//   optionsSuccessStatus: 200
// }));

// app.listen(3000, () => {
//   console.log('Server on port 3000');
// });