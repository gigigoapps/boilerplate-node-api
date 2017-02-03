'use strict'

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const parameters = requireRoot('parameters')

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: parameters.jwt.secret
}

passport.use(new JwtStrategy(opts, function(payload, done) {
    console.log(payload)

    //Find user in db based on payload data
    done(null,{_id:1,email:'asdfs@adsfs.com'})
    // done(false)
}))
