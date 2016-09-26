'use strict'

const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const expressDeliver = require('express-deliver')
const exception = require('express-deliver').exception
const session = require('express-session')
const RedisStore = require('connect-redis')(session);

const parameters = requireRoot('parameters');
const redisConnection = requireRoot('app/fn/redisConnection');

//Load custom exception
requireRoot('app/fn/customExceptions');

module.exports = function(app){

    //Disable express header
    app.set('x-powered-by',false)

    //Simple request logger
    app.use(morgan('dev'))

    //CORS options
    app.use(cors({
        origin : true, //Use the origin header in request
        maxAge : 600, 
        //exposedHeaders : ['Date','x-access-token'],
        //credentials:true
    }))

    //Responses based on promises
    app.use(expressDeliver)

    //Throw error if no redis connection
    app.use(function(req,res,next){
        if (!redisConnection.connected)
            throw new exception.DatabaseError();
        next();
    });


    //Session - cookie options
    app.use(session({
        secret : parameters.cookie.secret,
        resave : false,
        saveUninitialized : false,
        unset : 'destroy',
        cookie : {
            domain : parameters.cookie.domain
        },
        store : new RedisStore({
            prefix: 'sess:',
            ttl:parameters.sessionTTL,
            client : redisConnection.getClient()
        })
    }))

    //Parses http body
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    
}