// USERS CONTROLLER
const bcrypt = require('bcrypt');
const auth = require('../../auth');
const error = require('../../middleware/errors');
const jwt = require('jsonwebtoken');

const TABLE = 'auth';
const TABLE_USERS = 'users';


module.exports = function (dbinjected){
  let db = dbinjected;

  // Si no se ha inyectado la bd, se requiere el módulo
  if (!db) {
    db = require('../../DB/mysql');
  }

  // Función que autentica un usuario y obtiene el token
  async function login(username, password) {
    const data = await db.query_auth(username);

    return bcrypt.compare(password, data.password)
      .then(result => {
        if (result === true) {
          // Se genera un token
          const tokenData = {
            id: data.id,
            username: data.username,
            is_admin: data.is_admin
          }

          return {
            token: auth.asignToken(tokenData),
            is_admin: data.is_admin
          }
          
      } else {
        throw error('Usuario o contraseña incorrectos');
      }
    });
  }

  // Función que crea un registro en la tabla 'users'
  async function create(data) {
    const authData = {
      id: data.id,
    }

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hashSync(data.password.toString(), 5);
    }

    return db.create(TABLE, authData);
  }

  // Función que modifica la contraseña de usuario
  async function updatePassword(dataAuth) {
    // Buscamos el usuario con id
    const dataUser = await db.getOne(TABLE, dataAuth.id);
    const dataPwd = dataUser[0].password;

    // Se verifica que la contraseña actual sea correcta
    const passwordMatch = await bcrypt.compare(dataAuth.password, dataPwd);
    if (!passwordMatch) {
      throw error('Contraseña incorrecta');
    }

    // Actualizamos la contraseña actual
    const hashedNewPassword = await bcrypt.hash(dataAuth.new_password, 5);

    return db.updatePassword(dataAuth.id, hashedNewPassword);
  }

  // Función que resetea la contraseña de un usuario
  async function recoveryPassword(username) {
    let query = `SELECT * FROM ${TABLE} WHERE username = "${username}"`; 

    // Buscamos usuario con username
    const dataUser = await db.getOneAsistant(query, username);
    
    // Si el usuario existe, mandar email con enlace para cambiar contraseña
    if (dataUser.length > 0) {
      // Se crea el token
      const token = jwt.sign({ username }, 'CalpulliSecret', { expiresIn: '24h' });
      
      // Se almacena token en auth de acuerdo con su id
      await db.updateToken(TABLE, dataUser[0].id, token);

      dataUser[0].token = token;

      return dataUser[0];
    } else {
      throw error('Error: el correo ingresado no corresponde a ningún usuario registrado');
    }

  }

  // Función que resetea el password
  async function resetPassword(id, password, token) {
    const hash = await bcrypt.hashSync(password.toString(), 5);
    const decodeToken = jwt.verify(token, 'CalpulliSecret');
    const username = decodeToken.username;

    return db.resetPassword(id, hash, username);
  }

  return {
    create,
    login, 
    updatePassword, 
    recoveryPassword, 
    resetPassword
  }
}