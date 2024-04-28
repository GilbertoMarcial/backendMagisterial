const express = require('express');
const cors = require('cors');
const app = express();

// Habilitamos CORS para que la API pueda ser consumida por el frontend
app.use(cors({
  origin: 'http://localhost:4200', // URL del frontend
  optionsSuccessStatus: 200
}));

app.listen(3000, () => {
  console.log('Server on port 3000');
});