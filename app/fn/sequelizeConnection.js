'use strict'

const Sequelize = require('sequelize')
const debug = require('debug')('app:sequelize')
const parameters = requireRoot('parameters')
const EventEmitter = require('events')

let ready = false

class SequelizeConnection extends EventEmitter {

    constructor() {
        super()
        this.client
        this.connected = false
    }

    getClient() {
        return this.client
    }

    startClient() {
        this.client = new Sequelize(parameters.sequelizeDBConnectionUri, {
            logging: str => {
                debug('query', str)
            }
        })
        connect()
    }
}

const SequelizeConnectionObject = new SequelizeConnection()

function connect() {
    SequelizeConnectionObject.getClient()
        .authenticate()
        .then(() => {
            debug('Connection has been established successfully.')
            SequelizeConnectionObject.connected = true
            if (!ready)
                SequelizeConnectionObject.emit('connected', true)            
            ready = true
        })
        .catch(function (err) {
            SequelizeConnectionObject.connected = false
            debug('Unable to connect to the database:', err.message)
            setTimeout(() => {
                debug('reconect')
                connect()
            }, 4000)
        })
}

module.exports = SequelizeConnectionObject