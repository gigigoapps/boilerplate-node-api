'use strict';

const mainController = requireRoot('app/controllers/mainController');
const projectController = requireRoot('app/controllers/projectController');
const express = require('express')

module.exports = function(app){

    app.get('/',mainController.index);
    
    app.get('/error',mainController.error);

    app.get('/params/:id?',mainController.params);
    app.post('/params/:id?',mainController.params);

    let projectRouter = express.Router()
    app.use('/project',projectRouter)

    projectRouter.get('/',projectController.list);
    projectRouter.post('/',projectController.create);
    projectRouter.param('projectId',projectController.inject);
    
    projectRouter.get('/:projectId',projectController.detail);
    projectRouter.put('/:projectId',projectController.update);

};