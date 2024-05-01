// ASISTENTES CONTROLLER
const TABLE = 'asistente';
let query_get_all = "";
let query_get_one = "";


module.exports = function (dbinjected){
  let db = dbinjected;

  // Si no se ha inyectado la bd, se requiere el módulo
  if (!db) {
    db = require('../../DB/mysql');
  }

  // Función que obtiene todos los registros de la tabla 'asistente'
  function getAll() {
    query_get_all = `SELECT 
                      ${TABLE}.id, entidad, escuela, nombre_director, 
                      nombre_asistente, apellidos_asistente, licenciatura, semestre, 
                      email, telefono, is_vehiculo, funcion.nombre as name_funcion, 
                      modalidad.nombre as name_modalidad, tipo_vehiculo.nombre as name_vehiculo,
                      (SELECT COUNT(*) FROM ${TABLE}) AS total_asistentes
                    FROM 
                      ${TABLE}
                    INNER JOIN 
                      funcion ON asistente.funcion_id = funcion.id
                    INNER JOIN 
                      modalidad ON asistente.modalidad_id = modalidad.id
                    INNER JOIN 
                      tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id`;
    return db.getAllAsistants(query_get_all);
  }

  // Función que obtiene un registro de la tabla 'asistente' con el id 'id'
  function getOne(id) {
    query_get_one = `SELECT 
                      ${TABLE}.id, entidad, escuela, nombre_director, 
                      nombre_asistente, apellidos_asistente, licenciatura, semestre, 
                      email, telefono, is_vehiculo, funcion.nombre as name_funcion, 
                      modalidad.nombre as name_modalidad, tipo_vehiculo.nombre as name_vehiculo
                    FROM 
                      ${TABLE}
                    INNER JOIN 
                      funcion ON asistente.funcion_id = funcion.id
                    INNER JOIN 
                      modalidad ON asistente.modalidad_id = modalidad.id
                    INNER JOIN 
                      tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                    WHERE 
                      ${TABLE}.id = ${id}`
    return db.getOneAsistant(query_get_one);
  }

  // Función que obtiene un registro de la tabla 'asistente' de acuerdo con su email
  function getByEmail(email) {
    query_get_one = `SELECT 
                      ${TABLE}.id, entidad, escuela, nombre_director, 
                      nombre_asistente, apellidos_asistente, licenciatura, semestre, 
                      email, telefono, is_vehiculo, funcion.id as funcion_id, funcion.nombre as name_funcion, 
                      modalidad.id as modalidad_id, modalidad.nombre as name_modalidad, 
                      tipo_vehiculo.id as tipo_vehiculo_id, tipo_vehiculo.nombre as name_vehiculo
                    FROM 
                      ${TABLE}
                    INNER JOIN 
                      funcion ON asistente.funcion_id = funcion.id
                    INNER JOIN 
                      modalidad ON asistente.modalidad_id = modalidad.id
                    INNER JOIN 
                      tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                    WHERE 
                      email = ?`
    return db.getOneAsistantEmail(query_get_one, email);
  }

  // Función que elimina un registro de la tabla 'asistente' con el id 'id'
  function deleteOne(body) {
    return db.deleteOne(TABLE, body);
  }

  // Función que crea un registro en la tabla 'asistente'
  function create(body) {
    return db.create(TABLE, body);
  }

  // Función que actualiza un registro en la tabla 'asistente'
  function update(id, body) {
    // Antes de almacenar, remover is_admin para evitar conflictos
    // ya que solo es usado para fines de administrador
    if (body.hasOwnProperty('is_admin')) {
      delete body.is_admin;
    }
    
    return db.update(TABLE, id, body);
  }

  return {
    getAll, 
    getOne, 
    getByEmail,
    deleteOne, 
    create, 
    update
  }
}