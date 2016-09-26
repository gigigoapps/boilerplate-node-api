'use strict';

const mainController = requireRoot('app/controllers/mainController');

module.exports = function(app){

    app.get('/',mainController.index);
    
	app.get('/error',mainController.error);
    
    app.get('/params/:id?',mainController.params);
    app.post('/params/:id?',mainController.params);


};