const jwt = require('jsonwebtoken');
config = require('../config');
const error = require('../middleware/errors');

// Se obtiene la clave secreta para firmar el token
const secret = config.jwt.secret;

// Función que firma un token
function asignToken(data) {
  const expiresIn = '24h'; // Token expira en 24 horas
  return jwt.sign(data, secret, { expiresIn });
}

// Función que verifica un token
function verifyToken(token) {
  return jwt.verify(token, secret);
}

// Función que verifica existencia de Token
const checkToken = {
  confirmToken: function(req, id, is_admin) {
    const undecoded = undecodeHeader(req);

    // Se verifica que el id del token sea igual al id del usuario
    if (undecoded.id !== id) {

      // Si el id del token no es igual al id del usuario, 
      // verificar que sea un admin
      if (is_admin === 0) {
        throw error('No tienes los permisos para realizar esta acción');
      }
    }
  }
}

// Función que obtiene el token de la cabecera de la petición
function getToken(auth) {
  if (!auth) {
    throw error('No se ha enviado el token');
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Formato de token incorrecto');
  }

  let token = auth.replace('Bearer ', '');

  return token;
}

// Función que obtiene el token de la cabecera de la petición
const undecodeHeader = function (req) {
  const auth = req.headers.authorization || '';
  const token = getToken(auth);
  const undecoded = verifyToken(token);

  req.user = undecoded;

  return undecoded;
}

module.exports = {
  asignToken, 
  checkToken
}