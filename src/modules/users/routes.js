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
router.get('/', all);
router.get('/:id', one);
router.put('/', deleteOne);
router.post('/', create);
router.patch('/:id', update);
router.patch('/activate/:id', activate);
router.patch('/deactivate/:id', deactivate);

// Función que obtiene todos los registros de la tabla users
async function all (req, res, next) {
  try {
    const items_list = await controller.getAll();
    response.success(req, res, items_list, 200);
  } catch (error) {
    next(error);
  }
};

// Función que obtiene un registro de la tabla de acuerdo con su id
async function one (req, res, next) {
  try {
    const item = await controller.getOne(req.params.id);
    response.success(req, res, item, 200);
  } catch (error) {
    next(error);
  }
};

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
    response.success(req, res, 'Registro creado correctamente', 201);
  } catch (error) {
    next(error);
  }
}

// Función que actualiza un registro en la tabla
async function update (req, res, next) {
  try {
    await controller.update(req.params.id, req.body);
    response.success(req, res, 'Registro actualizado correctamente', 200);
  } catch (error) {
    next(error);
  }
}

// Función que desactiva un registro en la tabla
async function activate (req, res, next) {
  try {
    await controller.activate(req.params.id, req.body);
    response.success(req, res, 'Registro activado correctamente', 200);
  } catch (error) {
    next(error);
  }
}

// Función que desactiva un registro en la tabla
async function deactivate (req, res, next) {
  try {
    await controller.deactivate(req.params.id, req.body);
    response.success(req, res, 'Registro desactivado correctamente', 200);
  } catch (error) {
    next(error);
  }
}

// Exportamos el router para poder usar rutas en app.js
module.exports = router;
