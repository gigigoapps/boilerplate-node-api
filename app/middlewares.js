'use strict'

const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const expressDeliver = require('express-deliver')
const exception = require('express-deliver').exception;
const mongooseConnection = requireRoot('app/fn/mongooseConnection');

const parameters = requireRoot('parameters');

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

    //Throw error if no mongoose connection
    app.use(function(req,res,next){
        if (!mongooseConnection.connected)
            throw exception.DatabaseError;
        next();
    });

    //Parses http body
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
	
}