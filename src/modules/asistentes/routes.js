// ASISTENTES VIEWS
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
router.get('/', security(), all);
router.get('/all', security(), allPaginated);
router.get('/total', total);
router.get('/:id', one);
router.get('/email/:email', security(), oneByEmail);
router.patch('/', security(), deleteOne);
router.post('/', create);
router.patch('/:id', security(), update);

// Rutas por modalidad
router.get('/modalidad/:id', security(), getByModalidad);

// Función que obtiene todos los registros de la tabla asistentes
async function all (req, res, next) {
  try {
    const items_list = await controller.getAll();
    response.success(req, res, items_list, 200);
  } catch (error) {
    next(error);
  }
};

// Función que obtiene todos los registros de la tabla asistentes por páginación (25 o 50)
async function allPaginated (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const startIndex = (page - 1) * limit;

  try {
    const items_list = await controller.getAllPaginated(startIndex, limit);
    response.success(req, res, items_list, 200);
  } catch (error) {
    next(error);
  }
};

// Función que obtiene el total de registros de la tabla asistentes
async function total (req, res, next) {
  try {
    const total = await controller.getTotal();
    response.success(req, res, total, 200);
  } catch (error) {
    next(error);
  }
}

// Función que obtiene todos los registros de la tabla de acuerdo con su modalidad
async function getByModalidad (req, res, next) {
  try {
    const items_list = await controller.getByModalidad(req.params.id);
    response.success(req, res, items_list, 200);
  } catch (error) {
    next(error);
  }

}

// Función que obtiene un registro de la tabla de acuerdo con su id
async function one (req, res, next) {
  try {
    const item = await controller.getOne(req.params.id);
    response.success(req, res, item, 200);
  } catch (error) {
    next(error);
  }
};

// Función que obtiene un registro de la tabla de acuerdo con su email
async function oneByEmail (req, res, next) {
  try {
    const item = await controller.getByEmail(req.params.email);
    response.success(req, res, item, 200);
  } catch (error) {
    next(error);
  }
}

// Funcion que elimina un registro de la tabla de acuerdo con su id
async function deleteOne (req, res, next) {
  try {
    await controller.deleteOne(req.body);
    response.success(req, res, 'Registro eliminado correctamente', 200);
  } catch (error) {
    next(error);
  }
};

// Función que crea un registro en la tabla
async function create (req, res, next) {
  try {
    await controller.create(req.body);
    
    response.success(req, res, 'Usuario registrado correctamente', 201);
  } catch (error) {
    next(error);
  }
}

// Función que actualiza un registro en la tabla
async function update (req, res, next) {
  // Definir las claves permitidas que se pueden actualizar
  const dataFromRequest = req.body;
  const allowedKeys = ['entidad', 'escuela', 'nombre_director', 'nombre_asistente', 'apellidos_asistente', 'licenciatura', 'semestre', 'telefono', 'is_vehiculo', 'funcion_id', 'modalidad_id', 'tipo_vehiculo_id'];

  // Filtrar las claves válidas del JSON
  const filteredData = Object.keys(dataFromRequest)
    .filter(key => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = dataFromRequest[key];
      return obj;
    }, {});

  try {
    await controller.update(req.params.id, filteredData);
    response.success(req, res, 'Registro actualizado correctamente', 200);
  } catch (error) {
    next(error);
  }
}

// Exportamos el router para poder usar rutas en app.js
module.exports = router;
