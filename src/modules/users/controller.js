// USERS CONTROLLER
const TABLE = 'users';
let query_get_all = "";
let query_get_one = "";


module.exports = function (dbinjected){
  let db = dbinjected;

  // Si no se ha inyectado la bd, se requiere el módulo
  if (!db) {
    db = require('../../DB/mysql');
  }

  // Función que obtiene todos los registros de la tabla 'users'
  function getAll() {
    return db.getAll(TABLE);
  }

  // Función que obtiene un registro de la tabla 'users' con el id 'id'
  function getOne(id) {
    return db.getOne(TABLE, id);
  }

  // Función que elimina un registro de la tabla 'users' con el id 'id'
  function deleteOne(body) {
    return db.deleteOne(TABLE, body);
  }


  // Función que crea un registro en la tabla 'users'
  function create(body) {
    return db.create(TABLE, body);
  }

  // Función que actualiza un registro en la tabla 'users'
  function update(id, body) {
    return db.update(TABLE, id, body);
  }

  // Función que activa un registro en la tabla 'users'
  function activate(id, body) {
    return db.activate(TABLE, id, body);
  }

  // Función que desactiva un registro en la tabla 'users'
  function deactivate(id, body) {
    return db.deactivate(TABLE, id, body);
  }

  return {
    getAll, 
    getOne, 
    deleteOne, 
    create, 
    update,
    activate,
    deactivate
  }
}