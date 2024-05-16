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

  // Función que obtiene todos los registros de la tabla 'asistente' de manera paginada
  function getAllPaginated(startIndex, limit) {
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
                      tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                    ORDER BY ${TABLE}.id ASC
                    LIMIT ${startIndex}, ${limit}`;

    return db.getAllAsistants(query_get_all);
  }

  // Función que obtiene el total de registros de la tabla 'asistente'
  function getTotal() {
    query_get_all = `SELECT 
                      COUNT(*) AS total_asistentes
                    FROM 
                      ${TABLE}`;
    return db.getAllAsistants(query_get_all);
  }

  // Función que obtiene todos los registros por su modalidad
  function getByModalidad(id) {

    if (id == 11) {
      // Si es Asistente: modalidad_id = 11
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.asistente_nombre_asistentes as "Nombre asistentes (Modalidad Asistente)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      WHERE
                        asistente.modalidad_id = 11`;
    } 
    
    else if (id == 1) {
      // Si es Presentación artística - baile: modalidad_id = 1
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.baile_nombre_grupo as "Nombre grupo (Baile)", 
                          presentacion_gen.baile_numero_integrantes as "Número integrantes (Baile)",
                          presentacion_gen.baile_nombre_integrantes as "Nombre integrantes (Baile)", 
                          presentacion_gen.baile_programa as "Programa (Baile)", 
                          presentacion_gen.baile_duracion_programa as "Duración programa (Baile)", 
                          presentacion_gen.baile_nombre_coordinador as "Nombre coordinador (Baile)", 
                          presentacion_gen.baile_liga_red_social as "Enlace (Baile)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      WHERE
                        asistente.modalidad_id = 1`;
    }

    else if (id == 2) {
      // Si es Presentación artística - música: modalidad_id = 2
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.musica_nombre_solista_duo_grupo as "Nombre solista, duo o grupo (Música)", 
                          presentacion_gen.musica_numero_integrantes as "Número integrantes (Música)",
                          presentacion_gen.musica_nombre_integrantes as "Nombre integrantes (Música)", 
                          presentacion_gen.musica_genero_musical as "Género musical (Música)", 
                          presentacion_gen.musica_programa as "Programa (Música)", 
                          presentacion_gen.musica_duracion_programa as "Duración programa (Música)", 
                          presentacion_gen.musica_nombre_coordinador as "Nombre coordinador (Música)", 
                          presentacion_gen.musica_liga_red_social as "Enlace (Música)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      WHERE
                        asistente.modalidad_id = 2`;
    }

    else if (id == 3) {
      // Si es Presentación artística - artes escénicas: modalidad_id = 3
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.artes_nombre_grupo as "Nombre grupo (Artes Escénicas)", 
                          presentacion_gen.artes_numero_integrantes as "Número integrantes (Artes Escénicas)",
                          presentacion_gen.artes_nombre_integrantes as "Nombre integrantes (Artes Escénicas)", 
                          tipo_participacion.nombre as "Tipo Participación (Artes Escénicas)", 
                          presentacion_gen.artes_programa_teatro as "Programa u Obra (Artes Escénicas)", 
                          presentacion_gen.artes_duracion_programa as "Duración programa (Artes Escénicas)", 
                          presentacion_gen.artes_nombre_coordinador as "Nombre coordinador (Artes Escénicas)", 
                          presentacion_gen.artes_liga_red_social as "Enlace (Artes Escénicas)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      INNER JOIN
                        tipo_participacion ON presentacion_gen.artes_tipo_participacion_id = tipo_participacion.id
                      WHERE
                        asistente.modalidad_id = 3`;
    }

    else if (id == 4) {
      // Si es Taller: modalidad_id = 4
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.taller_titulo_taller as "Título (Taller)", 
                          presentacion_gen.taller_nombre_tallerista as "Nombre tallerista (Taller)",
                          presentacion_gen.taller_proposito_taller as "Propósito (Taller)", 
                          presentacion_gen.taller_duracion as "Duración (Taller)", 
                          presentacion_gen.taller_semblanza as "Semblanza (Taller)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      WHERE
                        asistente.modalidad_id = 4`;
    }

    else if (id == 5) {
      // Si es Himno: modalidad_id = 5
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.himno_titulo_himno as "Título (Himno)", 
                          presentacion_gen.himno_duracion_himno as "Duración (Himno)",
                          modalidad_himno.nombre as "Modalidad (Himno)", 
                          presentacion_gen.himno_numero_integrantes as "Número integrantes (Himno)", 
                          presentacion_gen.himno_nombre_integrantes as "Nombre integrantes (Himno)", 
                          presentacion_gen.himno_nombre_compositor as "Nombre compositor (Himno)", 
                          presentacion_gen.himno_nombre_coordinador as "Nombre coordinador (Himno)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      INNER JOIN
                        modalidad_himno ON presentacion_gen.himno_modalidad_himno_id = modalidad_himno.id
                      WHERE
                        asistente.modalidad_id = 5`;
    }

    else if (id == 6) {
      // Si es Muestra de composición y canto: modalidad_id = 6
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.canto_titulo_cancion as "Título (Composición y Canto)", 
                          presentacion_gen.canto_duracion_cancion as "Duración (Composición y Canto)",
                        presentacion_gen.canto_genero_musical as "Género musical (Composición y Canto)",
                          modalidad_canto.nombre as "Modalidad (Composición y Canto)", 
                          presentacion_gen.canto_numero_integrantes as "Número integrantes (Composición y Canto)", 
                          presentacion_gen.canto_nombre_integrantes as "Nombre integrantes (Composición y Canto)", 
                          presentacion_gen.canto_nombre_solista_grupo as "Nombre solista o grupo (Composición y Canto)", 
                          presentacion_gen.canto_nombre_compositor as "Nombre compositor (Composición y Canto)",
                          presentacion_gen.canto_nombre_coordinador as "Nombre coordinador (Composición y Canto)",
                          presentacion_gen.canto_liga_red_social as "Enlace (Composición y Canto)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      INNER JOIN
                        modalidad_canto ON presentacion_gen.canto_modalidad_canto_id = modalidad_canto.id
                      WHERE
                        asistente.modalidad_id = 6`;
    }

    else if (id == 7) {
      // Si es Muestra de oratoria: modalidad_id = 7
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.oratoria_titulo_discurso as "Título discurso (Oratoria)", 
                          presentacion_gen.oratoria_nombre_orador as "Nombre orador (Oratoria)",
                          presentacion_gen.oratoria_duracion as "Duración (Oratoria)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      WHERE
                        asistente.modalidad_id = 7`;
      
    }

    else if (id == 8) {
      // Si es Muestra de estudiantinas: modalidad_id = 8
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.estudiantina_nombre_estudiantina as "Nombre (Estudiantina)", 
                          presentacion_gen.estudiantina_numero_integrantes as "Número integrantes (Estudiantina)",
                          presentacion_gen.estudiantina_nombre_integrantes as "Nombre integrantes (Estudiantina)",
                          presentacion_gen.estudiantina_repertorio as "Repertorio (Estudiantina)", 
                          presentacion_gen.estudiantina_duracion_repertorio as "Duración (Estudiantina)",
                          presentacion_gen.estudiantina_nombre_coordinador as "Nombre coordinador (Estudiantina)",
                          presentacion_gen.estudiantina_liga_red_social as "Enlace (Estudiantina)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      WHERE
                        asistente.modalidad_id = 8`;
      
    }

    else if (id == 9) {
      // Si es Muestra de cortometraje: modalidad_id = 9
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.cortometraje_titulo_cortometraje as "Título (Cortometraje)", 
                          presentacion_gen.cortometraje_duracion_cortometraje as "Duración (Cortometraje)",
                          presentacion_gen.cortometraje_nombre_autor as "Nombre autor (Cortometraje)",
                          presentacion_gen.cortometraje_liga_red_social as "Enlace (Cortometraje)", 
                          presentacion_gen.cortometraje_ficha_descriptiva as "Ficha descriptiva (Cortometraje)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      WHERE
                        asistente.modalidad_id = 9`;
      
    }

    else if (id == 10) {
      // Si es Carrera de botargas: modalidad_id = 10
      query_get_all = `SELECT 
                        asistente.id, asistente.entidad, asistente.escuela, nombre_director, nombre_asistente, apellidos_asistente, licenciatura, semestre, asistente.email, asistente.telefono, is_vehiculo, 
                          funcion.nombre as "Función", 
                          modalidad.nombre as "Nombre Modalidad", 
                          tipo_vehiculo.nombre as "Tipo Vehículo",
                          presentacion_gen.escuela as "Escuela presentación", presentacion_gen.entidad as "Entidad presentación", 
                          presentacion_gen.email as "Email presentación", presentacion_gen.telefono_celular as "Teléfono presentación", 
                          presentacion_gen.botarga_nombre_botarga as "Nombre (Botarga)", 
                          presentacion_gen.botarga_nombre_representante as "Nombre representante (Botarga)",
                          presentacion_gen.botarga_email as "Email (Botarga)",
                          presentacion_gen.botarga_fotografia as "Fotografía (Botarga)", 
                          presentacion_gen.botarga_ficha_descriptiva as "Ficha descriptiva (Botarga)"
                      FROM 
                        asistente
                      INNER JOIN 
                        funcion ON asistente.funcion_id = funcion.id
                      INNER JOIN 
                        modalidad ON asistente.modalidad_id = modalidad.id
                      INNER JOIN 
                        tipo_vehiculo ON asistente.tipo_vehiculo_id = tipo_vehiculo.id
                      INNER JOIN
                        presentacion_gen ON asistente.id = presentacion_gen.id
                      WHERE
                        asistente.modalidad_id = 10`;
      
    }
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
    getAllPaginated,
    getTotal,
    getOne, 
    getByEmail,
    deleteOne, 
    create, 
    update, 
    getByModalidad
  }
}