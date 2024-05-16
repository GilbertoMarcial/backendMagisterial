// USERS VIEWS
// Se importa express para poder usar el router
const express = require('express');

// Se importan las responses para poder usar la estructura de la respuesta
const response = require('../../network/responses');

// Se importa el index que es el constructor donde se inyecta la base de datos
const controller = require('./index');

// Se importa security para validar a través de Token
const security = require('./security');

// Se importa nodemailer
const nodemailer = require('nodemailer');

// Se importa el router de express para poder definir las rutas de la aplicación.
const router = express.Router();

// Se importa el módulo de file system para poder leer archivos
const fs = require('fs');
const path = require('path');
const { log } = require('console');

// Rutas de la aplicación
router.post('/', login);
router.patch('/update', updatePassword);
router.put('/recovery', recoveryPassword);
router.patch('/reset', resetPassword);

// Funciones
async function login (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const token = await controller.login(username, password);
    response.success(req, res, token, 200);
  } catch (error) {
    next(error);
  }
}

async function updatePassword (req, res, next) {
  try {
    const dataAuth = {
      id: req.body.id,
      password: req.body.password,
      new_password: req.body.new_password
    };

    await controller.updatePassword(dataAuth);
    response.success(req, res, 'Contraseña actualizada correctamente', 200);
  } catch (error) {
    next(error);
  }
}

async function recoveryPassword (req, res, next) {
  try {
    const username = req.body.username;
    console.log('Username: ', username);
    const dataUser = await controller.recoveryPassword(username);

    // Enviar email
    sendMail(dataUser);

    response.success(req, res, 'Se ha enviado un email para restablecer su contraseña', 200);
  } catch (error) {
    next(error);
  }
}

async function sendMail (dataUser) {
  const htmlPath = path.join(__dirname, 'email-reset.html');
  let html = fs.readFileSync(htmlPath, 'utf8');


  const enlace = "https://www.calpullixalapa.com.mx/reset?id=" + dataUser.id + "&token=" + dataUser.token;
  // const enlace = "http://localhost:4200/reset?id=" + dataUser.id + "&token=" + dataUser.token;

  // Reemplazamos variables
  html = html.replaceAll('{{ username }}', dataUser.username);
  html = html.replaceAll('{{ enlace }}', enlace);

  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.calpullixalapa.com.mx',
      port: 587,
      auth: {
        user: 'noresponder@calpullixalapa.com.mx',
        pass: '%awp[7x@k2sL'
      }
    });

    const info = await transporter.sendMail({
      from: "Calpulli 2024 <noresponder@calpullixalapa.com.mx>",
      to: `${dataUser.username}`,
      subject: "Restablecer contrase&#241;a de Calpulli 2024",
      html: html
    });
    
    console.log('Mensaje enviado: %s', info.messageId);
  }catch (error) {
    console.log('Error mandando mensaje', error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const token = req.body.token;

    await controller.resetPassword(id, password, token);
    response.success(req, res, 'Contraseña actualizada correctamente', 200);
  } catch (error) {
    next(error);
  }

}

// Exportamos el router para poder usar rutas en app.js
module.exports = router;
