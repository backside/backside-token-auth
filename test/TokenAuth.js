
var assert = require("assert")
var TokenAuth = require("../lib/TokenAuth")
var jwt = require("jsonwebtoken")
var secret = "my secret"
describe("Token Auth", function() {
  it("should be be able to decode a token", function(done) {
    var t = jwt.sign({user: "stuff"}, secret)
    var auth = new TokenAuth(secret)
    auth.loadUser(t, null, function(err, isValid, obj) {
      if (err) return done(err)
      assert.equal(isValid, true)
      assert.equal(obj.user, "stuff")
      done()
    })
  })
})
