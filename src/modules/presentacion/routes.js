// PRESENTACIÓN VIEWS
// Se importa express para poder usar el router
const express = require('express');

// Se importa security para validar a través de Token
const security = require('./security');

// Se importan las responses para poder usar la estructura de la respuesta
const response = require('../../network/responses');

// Se importa el index que es el constructor donde se inyecta la base de datos
const controller = require('./index');

// Se importa el router de express para poder definir las rutas de la aplicación.
const router = express.Router();

// Se importa multer para poder subir archivos
const multer = require('multer');

// Rutas de la aplicación
// router.get('/search/:id', security(), getById);
router.get('/:id', security(), getById);
router.get('/exists/:id', security(), exists);
router.post('/', security(), create);
router.patch('/:id', update);
router.post('/file/:id', uploadFile)

// Función que obtiene los datos de la presentación a través de su id
async function getById (req, res, next) {
  try {
    const item = await controller.getById(req.params.id);
    response.success(req, res, item, 200);
  } catch (error) {
    next(error);
  }
} 

// Función que solo sirve para saber si existe un registro por su id
async function exists (req, res, next) {
  try {
    const item = await controller.exists(req.params.id);
    response.success(req, res, item, 200);
  } catch (error) {
    next(error);
  }
}

// Función que crea un registro en la tabla 'presentacion_gen'
async function create (req, res, next) {
  try {
    await controller.create(req.body);
    response.success(req, res, 'Registro creado correctamente', 200);
  } catch (error) {
    next(error);
  }
}

// Función que actualiza los registros de la tabla 'presentacion_gen'
async function update (req, res, next) {
  const filteredBody = req.body;
  const allowedKeys = [
    // Globales
    'id',
    'escuela', 
    'entidad', 
    'email', 
    'telefono_celular', 

    // Asistente
    'asistente_nombre_asistentes', 

    // Baile
    'baile_nombre_grupo', 
    'baile_numero_integrantes', 
    'baile_nombre_integrantes', 
    'baile_programa', 
    'baile_duracion_programa', 
    'baile_nombre_coordinador', 
    'baile_liga_red_social', 

    // Música
    'musica_nombre_solista_duo_grupo', 
    'musica_numero_integrantes', 
    'musica_nombre_integrantes', 
    'musica_genero_musical', 
    'musica_programa', 
    'musica_nombre_compositor', 
    'musica_duracion_programa', 
    'musica_nombre_coordinador', 
    'musica_liga_red_social', 

    // Artes
    'artes_nombre_grupo', 
    'artes_numero_integrantes', 
    'artes_nombre_integrantes', 
    'artes_tipo_participacion_id', 
    'artes_programa_teatro', 
    'artes_duracion_programa', 
    'artes_nombre_coordinador', 
    'artes_liga_red_social', 

    // Taller
    'taller_titulo_taller', 
    'taller_nombre_tallerista', 
    'taller_proposito_taller', 
    'taller_duracion', 
    'taller_semblanza', 

    // Himno
    'himno_titulo_himno', 
    'himno_duracion_himno', 
    'himno_modalidad_himno_id', 
    'himno_numero_integrantes', 
    'himno_nombre_integrantes', 
    'himno_nombre_compositor', 
    'himno_nombre_coordinador', 

    // Canto
    'canto_titulo_cancion', 
    'canto_duracion_cancion', 
    'canto_genero_musical', 
    'canto_modalidad_canto_id', 
    'canto_numero_integrantes', 
    'canto_nombre_integrantes', 
    'canto_nombre_solista_grupo', 
    'canto_nombre_compositor', 
    'canto_nombre_coordinador', 
    'canto_liga_red_social', 

    // Oratoria
    'oratoria_titulo_discurso', 
    'oratoria_nombre_orador', 
    'oratoria_duracion', 

    // Estudiantina
    'estudiantina_nombre_estudiantina', 
    'estudiantina_numero_integrantes', 
    'estudiantina_nombre_integrantes', 
    'estudiantina_repertorio', 
    'estudiantina_duracion_repertorio', 
    'estudiantina_nombre_coordinador', 
    'estudiantina_liga_red_social', 

    // Cortometraje
    'cortometraje_titulo_cortometraje', 
    'cortometraje_duracion_cortometraje', 
    'cortometraje_nombre_autor', 
    'cortometraje_liga_red_social', 
    'cortometraje_ficha_descriptiva', 

    // Botarga
    'botarga_nombre_botarga', 
    'botarga_nombre_representante', 
    'botarga_fotografia', 
    'botarga_ficha_descriptiva' 
  ];

  for (const field in filteredBody) {
    if (!allowedKeys.includes(field)) {
      delete filteredBody[field];
    }
  }

  // Si filteredBody se queda vacío, se manda un error
  if (Object.keys(filteredBody).length === 0) {
    return response.success(req, res, 'No se ha realizado ninguna modificación', 200);
  }

  try {
    await controller.update(req.params.id, filteredBody);
    response.success(req, res, 'Registro actualizado correctamente', 200);
  } catch (error) {
    next(error);
  }

}

// Función que permite la carga de archivos
async function uploadFile (req, res) {
  try {
    await controller.uploadFile(req, res);
    // response.success(req, res, 'Archivo subido correctamente', 200);
  } catch (error) {
    next(error);
  }
}

// Exporta el router para poder usar rutas en app.js
module.exports = router;
