// PRESENTACION CONTROLLER
const TABLE = 'presentacion_gen';
let query_get_one = "";

module.exports = function (dbinjected){
  let db = dbinjected;

  // Si no se ha inyectado la bd, se requiere el módulo
  if (!db) {
    db = require('../../DB/mysql');
  }

  // Función que obtiene un registro de la tabla presentacion de acuerdo con su id
  function getByIdTemp(id) {
    return db.getOne(TABLE, id);
  }
  function getById(id) {
    query_get_one = `SELECT
      presentacion_gen.id, escuela, entidad, email, telefono_celular, 
      
      asistente_nombre_asistentes, 
    
      baile_nombre_grupo, baile_numero_integrantes, baile_nombre_integrantes, baile_programa, 
      baile_duracion_programa, baile_nombre_coordinador, baile_liga_red_social, 
    
      musica_nombre_solista_duo_grupo, musica_numero_integrantes, musica_nombre_integrantes, 
      musica_genero_musical, musica_programa, musica_nombre_compositor, musica_duracion_programa, 
      musica_nombre_coordinador, musica_liga_red_social, 
    
      artes_nombre_grupo, artes_numero_integrantes, artes_nombre_integrantes, artes_tipo_participacion_id, 
      tipo_participacion.nombre as artes_tipo_participacion_nombre, 
      artes_programa_teatro, artes_duracion_programa, artes_nombre_coordinador, artes_liga_red_social, 
    
      taller_titulo_taller, taller_nombre_tallerista, taller_proposito_taller, taller_duracion, taller_semblanza, 
    
      himno_titulo_himno, himno_duracion_himno, himno_modalidad_himno_id, 
      modalidad_himno.nombre as himno_modalidad_himno_nombre, 
      himno_numero_integrantes, 
      himno_nombre_integrantes, himno_nombre_compositor, himno_nombre_coordinador, 
    
      canto_titulo_cancion, canto_duracion_cancion, canto_genero_musical, canto_modalidad_canto_id, 
      modalidad_canto.nombre as canto_modalidad_canto_nombre,
      canto_numero_integrantes, canto_nombre_integrantes, canto_nombre_solista_grupo, canto_nombre_compositor, 
      canto_nombre_coordinador, canto_liga_red_social, 
    
      oratoria_titulo_discurso, oratoria_nombre_orador, oratoria_duracion, estudiantina_nombre_estudiantina, 
    
      estudiantina_numero_integrantes, estudiantina_nombre_integrantes, estudiantina_repertorio, 
      estudiantina_duracion_repertorio, estudiantina_nombre_coordinador, estudiantina_liga_red_social, 
    
      cortometraje_titulo_cortometraje, cortometraje_duracion_cortometraje, cortometraje_nombre_autor, 
      cortometraje_liga_red_social, cortometraje_ficha_descriptiva, 
    
      botarga_nombre_botarga, botarga_nombre_representante, botarga_fotografia, botarga_ficha_descriptiva
    FROM
      ${TABLE}
    INNER JOIN
      tipo_participacion ON ${TABLE}.artes_tipo_participacion_id = tipo_participacion.id
    INNER JOIN
      modalidad_himno ON ${TABLE}.himno_modalidad_himno_id = modalidad_himno.id
    INNER JOIN
      modalidad_canto ON ${TABLE}.canto_modalidad_canto_id = modalidad_canto.id
    WHERE
      presentacion_gen.id = ${id}`;
    return db.getOneAsistant(query_get_one);
  }

  // Función que obtiene un registro de la tabla presentacion de acuerdo con el asistente_id
  function getByAsistenteId(id) {
    query_get_one = `SELECT
      ${TABLE}.id, escuela, entidad, email, telefono_celular, 
      
      asistente_nombre_asistentes, 
    
      baile_nombre_grupo, baile_numero_integrantes, baile_nombre_integrantes, baile_programa, 
      baile_duracion_programa, baile_nombre_coordinador, baile_liga_red_social, 
    
      musica_nombre_solista_duo_grupo, musica_numero_integrantes, musica_nombre_integrantes, 
      musica_genero_musical, musica_programa, musica_nombre_compositor, musica_duracion_programa, 
      musica_nombre_coordinador, musica_liga_red_social, 
    
      artes_nombre_grupo, artes_numero_integrantes, artes_nombre_integrantes, artes_tipo_participacion_id, 
      tipo_participacion.nombre as artes_tipo_participacion_nombre, 
      artes_programa_teatro, artes_duracion_programa, artes_nombre_coordinador, artes_liga_red_social, 
    
      taller_titulo_taller, taller_nombre_tallerista, taller_proposito_taller, taller_duracion, taller_semblanza, 
    
      himno_titulo_himno, himno_duracion_himno, himno_modalidad_himno_id, 
      modalidad_himno.nombre as himno_modalidad_himno_nombre, 
      himno_numero_integrantes, 
      himno_nombre_integrantes, himno_nombre_compositor, himno_nombre_coordinador, 
    
      canto_titulo_cancion, canto_duracion_cancion, canto_genero_musical, canto_modalidad_canto_id, 
      modalidad_canto.nombre as canto_modalidad_canto_nombre,
      canto_numero_integrantes, canto_nombre_integrantes, canto_nombre_solista_grupo, canto_nombre_compositor, 
      canto_nombre_coordinador, canto_liga_red_social, 
    
      oratoria_titulo_discurso, oratoria_nombre_orador, oratoria_duracion, estudiantina_nombre_estudiantina, 
    
      estudiantina_numero_integrantes, estudiantina_nombre_integrantes, estudiantina_repertorio, 
      estudiantina_duracion_repertorio, estudiantina_nombre_coordinador, estudiantina_liga_red_social, 
    
      cortometraje_titulo_cortometraje, cortometraje_duracion_cortometraje, cortometraje_nombre_autor, 
      cortometraje_liga_red_social, cortometraje_ficha_descriptiva, 
    
      botarga_nombre_botarga, botarga_nombre_representante, botarga_fotografia, botarga_ficha_descriptiva
    FROM
      ${TABLE}
    INNER JOIN
      tipo_participacion ON ${TABLE}.artes_tipo_participacion_id = tipo_participacion.id
    INNER JOIN
      modalidad_himno ON ${TABLE}.himno_modalidad_himno_id = modalidad_himno.id
    INNER JOIN
      modalidad_canto ON ${TABLE}.canto_modalidad_canto_id = modalidad_canto.id
    WHERE
      ${TABLE}.asistente_id = ${id}`;
    return db.getOneAsistant(query_get_one);
  }

  // Función que solo sirve para saber si existe un registro por su id
  function exists(id) {
    query_get_one = `SELECT id FROM ${TABLE} WHERE asistente_id = ${id}`;
    return db.getOneAsistant(query_get_one);
  }

  // Función que crea un registro en la tabla 'presentacion'
  function create(data) {
    return db.create(TABLE, data);
  }

  // Función que actualiza un registro en la tabla 'asistente'
  function update(id, body) {
    return db.update(TABLE, id, body);
  }

  return {
    getByAsistenteId, 
    getById, 
    create, 
    update, 
    exists
  }
}