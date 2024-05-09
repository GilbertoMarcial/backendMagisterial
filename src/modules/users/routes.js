// USERS VIEWS
// Se importa express para poder usar el router
const express = require('express');

// Se importa security para validar a través de Token
const security = require('./security');

// Se importan las responses para poder usar la estructura de la respuesta
const response = require('../../network/responses');

// Se importa nodemailer
const nodemailer = require('nodemailer');

// Se importa el index que es el constructor donde se inyecta la base de datos
const controller = require('./index');

// Se importa el módulo de file system para poder leer archivos
const fs = require('fs');

// Se importa el router de express para poder definir las rutas de la aplicación.
const router = express.Router();

// Se obtiene la ruta al archivo HTML
const path = require('path');
const htmlPath = path.join(__dirname, 'email.html');

// Rutas de la aplicación
router.get('/', security(), all);
router.get('/:id', one);
router.put('/', deleteOne);
router.post('/', create);
router.patch('/:id', update);
router.patch('/activate/:id', security(), activate);
router.patch('/deactivate/:id', security(), deactivate);

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
    // Comentado para fines de desarrollo descomentar antes de mandar a producción
    await sendMail(req, res);
    response.success(req, res, 'Usted se ha registrado satisfactoriamente, por favor inicie sesión', 201);
  } catch (error) {
    next(error);
  }
}

// Función que envía correo de confirmación
// Una vez que se haya agregado se manda correo de confirmación
const html = fs.readFileSync(htmlPath, 'utf8');
async function sendMail(req, res) {
  const { username } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.calpullixalapa.com.mx',
      port: 587,
      auth: {
        user: 'noresponder@calpullixalapa.com.mx',
        pass: ''
      }
    });

    const info = await transporter.sendMail({
      from: "Calpulli 2024 <noresponder@calpullixalapa.com.mx>",
      to: `${username}`,
      subject: "Bienvenido a Calpulli 2024",
      html: html
    });
    console.log('Mensaje enviado: %s', info.messageId);
  }catch (error) {
    console.log('Error mandando mensaje', error);
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
