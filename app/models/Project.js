'use strict'

// const debug = require('debug')('app:models:project')
const Sequelize = require('sequelize')
const sequelizeConnection = requireRoot('app/fn/sequelizeConnection')
const sequelizeClient = sequelizeConnection.getClient()

let projectModel = sequelizeClient.define('project', {
    name: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    }
})

projectModel.sync({force: false})

module.exports = projectModel