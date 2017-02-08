'use strict'

const expressDeliver = require('express-deliver')
const exception = expressDeliver.exception
const Project = requireRoot('app/models/Project')
// const toObjectId = requireRoot('app/fn/utils').toObjectId

module.exports = expressDeliver.wrapper({

    *create(req) {
        let doc = req.body
        let project = yield Project.create(doc)
        return project
    },

    *list() {
        let projects = yield Project.findAll()
        return projects ? projects : []
    },

    *detail(req) {
        let project = yield Project.find({
            where: { id: req.params.projectId }
        })

        if (!project)
            throw new exception.ItemNotFound()

        return project
    },

    *update(req) {
        let doc = req.body

        let project = yield Project.find({
            where: { id: req.params.projectId }
        })
        if (!project)
            throw new exception.ItemNotFound()        

        return yield project.updateAttributes(doc)            
    }
})