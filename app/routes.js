'use strict'

const mainController = requireRoot('app/controllers/mainController')
const passport = require('passport')

module.exports = function(app){

    app.get('/',mainController.index)
    
    app.get('/error',mainController.error)
    
    app.get('/params/:id?',mainController.params)
    app.post('/params/:id?',mainController.params)

    app.use('/login', mainController.login)
    app.use('/securized',
        passport.authenticate('jwt', { failWithError:true, session: false }),
        mainController.authenticationSuccess,
        mainController.authenticationFail
    )
    app.use('/securized/profile',mainController.getProfile)

}