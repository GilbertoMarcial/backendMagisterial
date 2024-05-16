const mysql = require('mysql');
const config = require('../config');

// Conexión a la BD
const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
};

let connection = require('./mysqlConnector');

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

// Función que obtiene un registro de la tabla 'asistentes' (genérico) con el id 'id'
function getOneAsistant(query) {
  return new Promise((resolve, reject) => {
    connection.query(`${query}`, (err, data) => {
      return (err) ? reject(err) : resolve(data);
    });
  });
}

// Función que obtiene un registro de la tabla 'asistentes' por su email
function getOneAsistantEmail(query, email) {
  return new Promise((resolve, reject) => {
    connection.query(query, [email], (err, data) => {
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

function createPresentacion(table, id, data) {
  // Clonamos el objeto data para evitar modificar el original
  const newData = { ...data }

  return new Promise((resolve, reject) => {
    if (data.id) {
      newData.id = data.id;
    }
    connection.query(`INSERT INTO ${table} SET ?`, newData, (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

// Función que actualiza un registro en la tabla 'table'
function update(table, id, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

// Función que activa un registro en la tabla 'table'
function activate(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET is_active = 1 WHERE id = ?`, [id], (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

// Función que desactiva un registro en la tabla 'table'
function deactivate(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET is_active = 0 WHERE id = ?`, [id], (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

// Función para autenticar un usuario
function query_auth(username) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT auth.id, auth.username, auth.password, users.is_admin 
                    FROM auth 
                    INNER JOIN users on auth.username = users.username 
                    WHERE auth.username = ?`, username, (err, data) => {
      if (err) {
        reject(err); // Si hay un error en la consulta, rechazar la promesa con el error
      } else {
        // Verificar si los datos se encontraron
        if (data && data.length > 0) {
          resolve(data[0]); // Si se encontraron datos, resolver la promesa con los datos
        } else {
          reject(new Error ('Usuario o contraseña incorrectos') ); 
        }
      }
    });
  });
}

// Función que modifica la contraseña de usuario
function updatePassword(id, hash) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE auth SET password = ? WHERE id = ?`, [hash, id], (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

// Función que resetea la contraseña de un usuario
function resetPassword(id, hash, username) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE auth SET password = ? WHERE username = ?`, [hash, username], (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}

// Función que almacena el token en auth de acuerdo con su id
function updateToken(table, id, token) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET token = ? WHERE id = ?`, [token, id], (err, result) => {
      return (err) ? reject(err) : resolve(result);
    });
  });
}


module.exports = {
    getAll,
    getAllAsistants,
    getOne,
    getOneAsistant,
    getOneAsistantEmail,
    deleteOne,
    create,
    createPresentacion,
    update,
    activate,
    deactivate,
    query_auth, 
    updatePassword, 
    updateToken, 
    resetPassword
};
