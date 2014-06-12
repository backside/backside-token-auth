var jwt = require("jsonwebtoken")

function TokenAuth(secret) {
  this.secret = secret || "default secret"
}
// pass isn't used here, but we need the param for the API
TokenAuth.prototype.loadUser = function(token, pass, cb) {
  if (token == null) {
    return cb()
  }
  var userObj = jwt.verify(token, this.secret, function(err, userObj) {
    // swallow errors, userObj will be undefined if wrong
    cb(null, !!userObj, userObj)
  })
}

TokenAuth.prototype.middleware = function() {
  var self = this
  return function (req, res, next) {
    self.loadUser(req.query.auth, function(err, isValid, user) {
      if (err) return next(err)
      req.user = user
      next()
    })
  }
}

TokenAuth.prototype.getRoutes = function() {
  return {}
}

module.exports = TokenAuth
