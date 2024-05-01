// PRESENTACION CONTROLLER
const TABLE = 'presentacion';
let query_get_one = "";

module.exports = function (dbinjected){
  let db = dbinjected;

  // Si no se ha inyectado la bd, se requiere el módulo
  if (!db) {
    db = require('../../DB/mysql');
  }

  // Función que obtiene un registro de la tabla presentacion de acuerdo con el asistente_id
  function getByAsistenteId(id) {
    query_get_one = `SELECT
                      ${TABLE}.id, escuela, entidad, nombre_grupo, num_integrantes, nombre_integrantes,
                      nombre_programa, proposito, duracion_programa, genero_musical, nombre_compositor,
                      email, telefono, enlace, archivo, foto, tipo_participacion.id as tipo_participacion_id,
                      tipo_participacion.nombre as name_tipo_participacion, modalidad_himno.id as modalidad_himno_id, 
                      modalidad_himno.nombre as name_modalidad_himno, modalidad_canto.id as modalidad_canto_id, 
                      modalidad_canto.nombre as name_modalidad_canto 
                    FROM
                      ${TABLE}
                    INNER JOIN
                      tipo_participacion ON presentacion.tipo_participacion_id = tipo_participacion.id
                    INNER JOIN
                      modalidad_himno ON presentacion.modalidad_himno_id = modalidad_himno.id
                    INNER JOIN
                      modalidad_canto ON presentacion.modalidad_canto_id = modalidad_canto.id
                    WHERE
                      ${TABLE}.asistente_id = ${id}`;
    return db.getOneAsistant(query_get_one);
  }

  return {
    getByAsistenteId
  }
}