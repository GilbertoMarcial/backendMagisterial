// USERS CONTROLLER
const bcrypt = require('bcrypt');
const auth = require('../../auth');
const TABLE = 'auth';


module.exports = function (dbinjected){
  let db = dbinjected;

  // Si no se ha inyectado la bd, se requiere el módulo
  if (!db) {
    db = require('../../DB/mysql');
  }

  // Función que autentica un usuario y obtiene el token
  async function login(username, password) {
    const data = await db.query(TABLE, {username: username});

    return bcrypt.compare(password, data.password)
      .then(result => {
        if (result === true) {
          // Se genera un token
          return auth.asignToken({ ...data});
          
      } else {
        throw new Error('Información inválida');
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

  return {
    create,
    login
  }
}