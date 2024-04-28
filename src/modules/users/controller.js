// USERS CONTROLLER
const TABLE = 'users';
const auth = require('../auth');
const asistant = require('../asistentes');


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
  async function create(body) {
    const userData = {
      id: body.id,
      username: body.username || '',
      is_admin: body.is_admin || 0,
      is_active: body.is_active || 1
    }

    // Se obtiene el id del registro recién insertado
    const response = await db.create(TABLE, userData);

    const insertId = response.insertId;

    let responseAuth = '';

    // Se crea el registro en la tabla 'auth'
    if (body.username && body.password) {
      responseAuth = await auth.create({
        id: insertId,
        username: body.username,
        password: body.password
      });
    }

    // Se crea tambien el registro en asistentes si is_admin = 0
    if (body.is_admin === 0) {
      await asistant.create({
        id: insertId,
        nombre_asistente: body.nombre_asistente,
        apellidos_asistente: body.apellidos_asistente,
        email: body.username,
        funcion_id: 1,
        modalidad_id: 1,
        tipo_vehiculo_id: 1
      });
    }

    return responseAuth;
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