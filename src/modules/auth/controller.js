// USERS CONTROLLER
const bcrypt = require('bcrypt');
const auth = require('../../auth');
const error = require('../../middleware/errors');

const TABLE = 'auth';
const TABLE_USERS = 'users';


module.exports = function (dbinjected){
  let db = dbinjected;

  // Si no se ha inyectado la bd, se requiere el módulo
  if (!db) {
    db = require('../../DB/mysql');
  }

  // Función que autentica un usuario y obtiene el token
  async function login(username, password) {
    const data = await db.query_auth(username);

    return bcrypt.compare(password, data.password)
      .then(result => {
        if (result === true) {
          // Se genera un token
          const tokenData = {
            id: data.id,
            username: data.username,
            is_admin: data.is_admin
          }

          return {
            token: auth.asignToken(tokenData),
            is_admin: data.is_admin
          }
          
      } else {
        throw error('Usuario o contraseña incorrectos');
      }
    });
  }

  // Función que crea un registro en la tabla 'users'
  async function create(data) {
    const authData = {
      id: data.id,
    }

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hashSync(data.password.toString(), 5);
    }

    return db.create(TABLE, authData);
  }

  // Función que modifica la contraseña de usuario
  async function updatePassword(username, password, new_password) {
    const data = await db.query_auth(username, password, new_password);

    return bcrypt.compare(password, data.password)
      .then(result => {
        if (result === true) {
          return bcrypt.hash(new_password, 5)
            .then(hash => {
              return db.updatePassword(username, hash);
            });
        } else {
          throw error('Contraseña incorrecta');
        }
      });
  }

  return {
    create,
    login, 
    updatePassword
  }
}