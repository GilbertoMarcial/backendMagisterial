// Load module
var mysql = require('mysql');
const config = require('../config');

// Initialize pool
var pool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  debug: false
});

module.exports = pool;
