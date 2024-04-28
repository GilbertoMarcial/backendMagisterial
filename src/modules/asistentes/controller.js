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
                      ${TABLE}.id as id_asistente, entidad, escuela, nombre_director, 
                      nombre_asistente, apellidos_asistente, licenciatura, semestre, 
                      email, telefono, is_vehiculo, funcion.nombre as funcion_nombre, 
                      modalidad.nombre as modalidad_nombre, tipo_vehiculo.nombre as vehiculo_nombre,
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
                      ${TABLE}.id as id_asistente, entidad, escuela, nombre_director, 
                      nombre_asistente, apellidos_asistente, licenciatura, semestre, 
                      email, telefono, is_vehiculo, funcion.nombre as funcion_nombre, 
                      modalidad.nombre as modalidad_nombre, tipo_vehiculo.nombre as vehiculo_nombre
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
    deleteOne, 
    create, 
    update
  }
}