const mysql = require('mysql');
const config = require('../config');

// Conexión a la BD
const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
};

let connection;

// Función para manejar la conexión a la BD
function handleConnection() {
  connection = mysql.createConnection(dbConfig);

  // Conectar a la BD
  connection.connect((err) => {
    if (err) {
      console.error('[db error]', err);
      // Después de un tiempo volver a intentar la conexión
      setTimeout(handleConnection, 2000);
    } else {
      // Si no hay errors, mostrar mensaje de conexión exitosa
      console.log('DB Connected');
    }
  });

  // Manejar errores de la conexión
  connection.on('error', (err) => {
    console.error('[db error]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection();
    } else {
      throw err;
    }
  });
}

// Llamamos a la conexión
handleConnection();

// Función que obtiene todos los registros de la tabla genérica 'table'
function getAll(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      return (err) ? reject(err) : resolve(data);
    });
  });
}

// Función que obtiene todos los registros de la tabla 'asistentes'
function getAllAsistants(query = 'SELECT * FROM') {
  return new Promise((resolve, reject) => {
    connection.query(`${query}`, (err, data) => {
      return (err) ? reject(err) : resolve(data);
    });
  });
}

// Función que obtiene un registro de la tabla genérica 'table' con el id 'id'
function getOne(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, data) => {
      return (err) ? reject(err) : resolve(data);
    });
  });
}

// Función que obtiene un registro de la tabla 'asistentes' con el id 'id'
function getOneAsistant(query) {
  return new Promise((resolve, reject) => {
    connection.query(`${query}`, (err, data) => {
      return (err) ? reject(err) : resolve(data);
    });
  });
}

// Funciton que eliminar un registro de la tabla 'table' con el id 'id'
function deleteOne(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE id = ?`, data.id, (err, data) => {
      return (err) ? reject(err) : resolve(data);
    });
  });
}

// Función que crea un registro en la tabla 'table'
function create(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

function update(table, id, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

function activate(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET is_active = 1 WHERE id = ?`, [id], (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

function deactivate(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET is_active = 0 WHERE id = ?`, [id], (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

module.exports = {
    getAll,
    getAllAsistants,
    getOne,
    getOneAsistant,
    deleteOne,
    create,
    update,
    activate,
    deactivate
};
