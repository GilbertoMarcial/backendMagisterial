const auth = require('../../auth');

module.exports = function checkAuth() {

  function middleware(req, res, next) {
    const id = req.body.id || null;
    const is_admin = req.body.is_admin || 0;
    auth.checkToken.confirmToken(req, id, is_admin);
    next();
  }

  return middleware;
}