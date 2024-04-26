// USERS CONTROLLER
const TABLE = 'auth';
let query_get_all = "";
let query_get_one = "";


module.exports = function (dbinjected){
  let db = dbinjected;

  // Si no se ha inyectado la bd, se requiere el módulo
  if (!db) {
    db = require('../../DB/mysql');
  }

  // Función que crea un registro en la tabla 'users'
  function create(data) {
    const authData = {
      id: data.id,
    }

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = data.password;
    }

    return db.create(TABLE, authData);
  }

  return {
    create
  }
}