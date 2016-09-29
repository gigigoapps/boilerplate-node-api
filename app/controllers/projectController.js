'use strict';

const expressDeliver = require('express-deliver')
const exception = expressDeliver.exception
const parameters = requireRoot('parameters');
const Project = requireRoot('app/models/Project');
const toObjectId = requireRoot('app/fn/utils').toObjectId;

module.exports = expressDeliver.wrapper({

    create(req,res){
        // return Project.createRandom()
        
        let doc = req.body
        // let doc = Project.pickPublicProperties(req.body);
        
        return Project.create(doc)
            // .then(Project.pickPublicProperties.bind(Project))
    },

    list(req,res){
        return Project.find().exec()
            // .then(Project.pickPublicProperties.bind(Project))
    },

    detail(req,res){
        // return this.project.pickPublicProperties()
        return this.project
    },

    update(req,res){
        return this.project.updateAndReturn(req.body)
            // .then(Project.pickPublicProperties.bind(Project))
    },

    inject(req,res,next,value){
        Project.findOne({
            slug : value
        })
        .exec()
        .then(project=>{
            if (!project)
                throw exception.ItemNotFound;
            this.project = project //same as res.locals.project = project
            next()
        })
        .done()
        return expressDeliver.ignore
    }
})
